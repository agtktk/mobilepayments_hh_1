import { siteConfig } from '../../site.config.js';

export function GET() {
  const code = siteConfig.naverVerificationCode || 'replace-with-your-naver-verification-code';

  return new Response(`naver-site-verification: ${code}`, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8'
    }
  });
}
