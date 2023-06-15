using UserControl.Interfaces;

namespace UserControl.Services
{
    public class ImageService : IImageService
    {
        public ImageService() { }

        public async Task<byte[]> ConvertToByteArray(IFormFile imageFile)
        {
            using (var memoryStream = new MemoryStream())
            {
                await imageFile.CopyToAsync(memoryStream);
                return memoryStream.ToArray();
            }
        }
    }
}
