// 検索に載せるのは本番の metro-ishitsu.uzu-app.com だけ。それも公開日時
// （日本時間 2026/10/15 13:30）を過ぎてから。時刻で自動的に切り替わるので、当日の再デプロイは要らない。
// *.vercel.app などそれ以外の URL は、ずっと検索に載せない。
const INDEX_HOST = 'metro-ishitsu.uzu-app.com';
const INDEX_FROM = Date.parse('2026-10-15T13:30:00+09:00');

export const config = { matcher: '/:path*' };

export default function middleware(request) {
  const host = new URL(request.url).hostname;
  if (host === INDEX_HOST && Date.now() >= INDEX_FROM) return;
  // @vercel/functions の next() と同じ仕組み：オリジンの応答にこのヘッダーを足して返す
  return new Response(null, {
    headers: { 'x-middleware-next': '1', 'X-Robots-Tag': 'noindex, nofollow' },
  });
}
