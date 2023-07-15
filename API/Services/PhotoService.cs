using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Helpers;
using API.Interfaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;

namespace API.Services
{
    public class PhotoService : IPhotoService
    {
        private readonly Cloudinary _cloudinary; // Cloudinary is a class that comes from the CloudinaryDotNet package
        public PhotoService(IOptions<CloudinarySettings> config)
        {
            var acc = new Account
            (
                config.Value.CloudName, // Cloudinary account name
                config.Value.ApiKey, // Cloudinary API key
                config.Value.ApiSecret // Cloudinary API secret
            );

            _cloudinary = new Cloudinary(acc); // Create a new instance of Cloudinary and pass in the account details

        }

        
        public async Task<ImageUploadResult> AddPhotoAsync(IFormFile file)
        {
            var uplaodResult = new ImageUploadResult(); // Create a new instance of ImageUploadResult

            if(file.Length > 0)
            {
                using var stream = file.OpenReadStream(); // Open a stream to read the file
                var uploadParams = new ImageUploadParams // Create a new instance of ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream), // FileDescription is a class that comes from the CloudinaryDotNet package
                    Transformation = new Transformation().Height(500).Width(500).Crop("fill").Gravity("face"), // Transformation is a class that comes from the CloudinaryDotNet package
                    Folder = "IMatcher_datingApp" // Folder is the name of the folder in Cloudinary where we want to store the photos
                };

                
                uplaodResult = await _cloudinary.UploadAsync(uploadParams); // Upload the photo to Cloudinary
            }

            return uplaodResult; // Return the result of the upload
        }

        public async Task<DeletionResult> DeletePhotoAsync(string publicId)
        {
            var deleteParams = new DeletionParams(publicId); // Create a new instance of DeletionParams

            return await _cloudinary.DestroyAsync(deleteParams); // Delete the photo from Cloudinary
        }
    }
}