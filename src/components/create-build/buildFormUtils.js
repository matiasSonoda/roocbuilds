import DOMPurify from 'dompurify';
import { SANITIZE_BUILD_CONTENT_OPTIONS } from './buildFormConstants';

export function sanitizeBuildContent(content) {
  const sanitizedHTML = DOMPurify.sanitize(content, SANITIZE_BUILD_CONTENT_OPTIONS);
  const template = document.createElement('template');
  template.innerHTML = sanitizedHTML;

  template.content.querySelectorAll('iframe').forEach((iframe) => {
    try {
      const videoUrl = new URL(iframe.getAttribute('src'));
      const allowedHosts = ['youtube.com', 'www.youtube.com', 'youtube-nocookie.com', 'www.youtube-nocookie.com'];
      const isYoutubeEmbed = videoUrl.protocol === 'https:'
        && (!videoUrl.port || videoUrl.port === '443')
        && allowedHosts.includes(videoUrl.hostname)
        && videoUrl.pathname.startsWith('/embed/');

      if (!isYoutubeEmbed) iframe.remove();
    } catch {
      iframe.remove();
    }
  });

  return template.innerHTML;
}
