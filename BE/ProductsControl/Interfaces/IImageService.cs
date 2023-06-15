namespace ProductsControl.Interfaces
{
    public interface IImageService
    {
        Task<byte[]> ConvertToByteArray(IFormFile imageFile);
    }
}
