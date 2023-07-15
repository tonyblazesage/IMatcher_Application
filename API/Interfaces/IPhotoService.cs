using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CloudinaryDotNet.Actions;

namespace API.Interfaces
{
    public interface IPhotoService
    {
        Task <ImageUploadResult> AddPhotoAsync(IFormFile file); // IFormFile is a file that is sent along with an HTTP request

        Task <DeletionResult> DeletePhotoAsync(string publicId); // publicId is the id of the photo that we want to delete from Cloudinary
    }
}