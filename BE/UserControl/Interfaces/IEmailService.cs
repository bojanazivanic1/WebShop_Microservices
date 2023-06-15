namespace UserControl.Interfaces
{
    public interface IEmailService
    {
        Task<bool> SendEmail(string receiver, string subject, string body);
    }
}
