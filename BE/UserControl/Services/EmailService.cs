﻿using MimeKit;
using MailKit.Net.Smtp;
using UserControl.Interfaces;
using SmtpClient = MailKit.Net.Smtp.SmtpClient;

namespace UserControl.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<bool> SendEmail(string receiver, string subject, string body)
        {
            try
            {
                var email = new MimeMessage();
                email.From.Add(new MailboxAddress(_configuration["EmailSettings:Name"], _configuration["EmailSettings:Email"]));
                email.To.Add(MailboxAddress.Parse(receiver));
                email.Subject = subject;
                email.Body = new TextPart(MimeKit.Text.TextFormat.Plain) { Text = body };

                var smtp = new SmtpClient();
                await smtp.ConnectAsync(_configuration["EmailSettings:Host"], int.Parse(_configuration["EmailSettings:Port"]!), MailKit.Security.SecureSocketOptions.StartTls);
                await smtp.AuthenticateAsync(_configuration["EmailSettings:Email"], _configuration["EmailSettings:Password"]);
                await smtp.SendAsync(email);
                await smtp.DisconnectAsync(true);
            }
            catch (Exception ex)
            {
                throw new Exception("We cannot send email right now.\nError: " + ex.Message);
            }

            return true;
        }
    }
}
