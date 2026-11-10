import { useEffect, useState } from 'react';
import { CloudinaryPhoto } from '../types';

export const CLOUD_NAME = 'dz6lay5a6';
export const TAG = 'Quinces_AnaSofia';

// Known initial list of tag resources to guarantee instant render without layout shift
const FALLBACK_TAG_RESOURCES = [
  { public_id: '15_AnaSofia_56_okdxwo', version: 1794267042, format: 'jpg' },
  { public_id: '15_AnaSofia_47_lyxhro', version: 1794267011, format: 'jpg' },
  { public_id: '15_AnaSofia_38_heokff', version: 1794266997, format: 'jpg' },
  { public_id: '15_AnaSofia_34_rt9w0f', version: 1794266989, format: 'jpg' },
  { public_id: '15_AnaSofia_31_irrbbv', version: 1794266982, format: 'jpg' },
  { public_id: '15_AnaSofia_28_adul96', version: 1794266974, format: 'jpg' },
  { public_id: '15_AnaSofia_12_urk2sr', version: 1794266941, format: 'jpg' },
];

function transformResourceToPhoto(item: {
  public_id: string;
  version?: number;
  format?: string;
}): CloudinaryPhoto {
  const ver = item.version ? `v${item.version}/` : '';
  const fmt = item.format || 'jpg';
  const cleanId = item.public_id;

  return {
    public_id: cleanId,
    url: `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/c_fill,w_1080,h_1600,g_auto,f_auto,q_auto/${ver}${cleanId}.${fmt}`,
    thumb: `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/c_fill,w_240,h_240,g_auto,f_auto,q_auto/${ver}${cleanId}.${fmt}`,
    caption: 'Ana Sofía • Mis 15 Años',
  };
}

export function getInitialTagPhotos(): CloudinaryPhoto[] {
  return FALLBACK_TAG_RESOURCES.map(transformResourceToPhoto);
}

/**
 * Hook to retrieve unique photographs belonging to Cloudinary tag 'Quinces_AnaSofia',
 * guaranteeing zero duplicates and automatically fetching dynamic updates from Cloudinary.
 */
export function useCloudinaryTagPhotos(): CloudinaryPhoto[] {
  const [photos, setPhotos] = useState<CloudinaryPhoto[]>(() => getInitialTagPhotos());

  useEffect(() => {
    let isMounted = true;

    async function fetchTagPhotos() {
      try {
        const response = await fetch(
          `https://res.cloudinary.com/${CLOUD_NAME}/image/list/${TAG}.json`
        );
        if (!response.ok) return;

        const data = await response.json();
        if (data && Array.isArray(data.resources) && data.resources.length > 0) {
          // Strict deduplication by public_id
          const seen = new Set<string>();
          const uniquePhotos: CloudinaryPhoto[] = [];

          for (const res of data.resources) {
            if (res && res.public_id && !seen.has(res.public_id)) {
              seen.add(res.public_id);
              uniquePhotos.push(transformResourceToPhoto(res));
            }
          }

          if (isMounted && uniquePhotos.length > 0) {
            setPhotos(uniquePhotos);
          }
        }
      } catch (err) {
        // Fallback already loaded, safe to ignore network failure
      }
    }

    fetchTagPhotos();

    return () => {
      isMounted = false;
    };
  }, []);

  return photos;
}
