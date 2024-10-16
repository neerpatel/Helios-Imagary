import React, { useState, useEffect } from 'react';
import { GetImageList } from '@/pages/api/get-image-list'; // Import the API service
import { GetGeneratedImageItem } from '@/types/generation-response';
import ImageModal from '@/components/ImageModal';
import { useRouter } from 'next/router';

const PhotoGallery = () => {

  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<GetGeneratedImageItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<GetGeneratedImageItem | null>(null);

  const router = useRouter();
  const openImageDetail = (hid: string) => {
    router.push(`/gallery/image/${hid}`); // Navigate to /gallery/image/{hid}
  };

  // Fetch images when the component mounts
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const fetchedImages = await GetImageList();
        setImages(fetchedImages);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message); // Now TypeScript knows 'err' has a 'message' property
        } else {
          setError('An unknown error occurred'); // Fallback for non-error objects
        }
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
    const openModal = (image: GetGeneratedImageItem) => {
      setSelectedImage(image);
    };
  
    const closeModal = () => {
      setSelectedImage(null);
    };
  
    return (
      <div>
        <h1>Generated Images</h1>
        <div style={galleryStyles.container}>
          {images.map((image) => (
            <div key={image.id} style={galleryStyles.itemContainer}>
              
              <img
                src={image.url}
                alt={image.prompt}
                style={galleryStyles.image}
                onClick={() => openModal(image)}
              />
              <div style={galleryStyles.imageBorder}></div>
              
              {/* Center the link under the image */}
              <a 
                //href={image.url} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
                onClick={() => openImageDetail(image.hid)}
              >
                View
              </a>
            </div>
          ))}
        </div>
        {selectedImage && <ImageModal url={selectedImage!.url} hid={selectedImage!.hid} name={selectedImage!.name} prompt={selectedImage!.prompt} likesAmount={selectedImage!.likesAmount} imageThumbnailfilename='' imagefilename='' email='' createDatetime='' updateDatetime='' id={1} onClose={closeModal} />}
      </div>
    );
  };
  
  const galleryStyles: { container: React.CSSProperties; itemContainer: React.CSSProperties; image: React.CSSProperties, imageBorder: React.CSSProperties } = {
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', // Responsive grid
      gap: '10px',  // Space between images
    },
    itemContainer: {
      textAlign: 'center', // Center the content (image and link) inside each grid item
      border: '2px solid #ccc', 
      borderRadius: '10px',
      padding: '5px',
    },
    image: {
      width: '100%',    // Full width in each grid cell
      height: '150px',  // Fixed height for uniformity
      objectFit: 'cover',  // Ensure the image maintains its aspect ratio
      cursor: 'pointer',  // Indicate the image is clickable
      borderRadius: '10px',
    },
    imageBorder: {
      paddingTop: '10px',
      paddingBottom: '3px',
      borderBottom: '2px solid #ccc' /* Bottom border */
    }
  };

export default PhotoGallery;