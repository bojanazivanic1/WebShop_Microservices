namespace UserControl.Interfaces
{
    public interface IImageService
    {
        Task<byte[]> ConvertToByteArray(IFormFile imageFile);
    }
}
