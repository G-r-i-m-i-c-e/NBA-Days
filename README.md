# NBA STATS — iPhone PWA（最终确认的极简库里压腕封面版）

## 文件结构

- `worker.js`：Cloudflare Worker 代理 NBA 数据接口
- `wrangler.jsonc`：Cloudflare Worker 部署配置
- `public/index.html`：App 页面
- `public/app.js`：七天赛程和球员完整 Box Score
- `public/manifest.webmanifest`：主屏幕安装配置
- `public/sw.js`：离线页面缓存
- `public/icon.png`、`public/icon-512.png`：库里压腕动作图标

## 仅使用 iPhone 部署（不需要 Mac）

1. 在 iPhone 的“文件”App 中点 ZIP 解压。
2. Safari 打开 https://github.com/new ，登录，建立仓库 `nba-stats-pwa`，选择 Private。
3. 进入仓库 → Add file → Upload files，将本项目根目录下 `worker.js`、`wrangler.jsonc`、`README.md` 上传；并在仓库中建立 `public` 目录、上传 `public` 内的全部六个文件。**不要把最外层文件夹再套进仓库。** iPhone GitHub 页面可选择“请求桌面网站”。
4. 打开 https://dash.cloudflare.com/ → Workers & Pages → Create → 连接 GitHub 仓库，选择 Workers 部署；构建命令留空，部署命令设置为 `npx wrangler deploy`（控制台实际字段可能不同）。
5. 如 Cloudflare Git 集成无法自动部署：可使用 GitHub Codespaces 在浏览器中打开仓库，运行 `npm install -g wrangler`、`npx wrangler login`、`npx wrangler deploy`。需要授权 Cloudflare。
6. 部署成功后访问 `https://<worker-name>.<account>.workers.dev`，确认能显示比赛和球员数据。
7. Safari 打开网址 → 分享 → 添加到主屏幕 → 添加。

## 注意

- 这是**源代码**，不是已部署的网址或 IPA；未经生产环境、iPhone 真机端到端测试。
- NBA Live CDN 为非官方第三方使用接口，不保证持续可用。数据加载失败时页面会提示，不会伪造比分或球员统计。
- 当前显示美东比赛日，七天范围为今天前后三天。比赛进行期间每 60 秒自动刷新。
- 图标含生成式绘制的库里动作及 NBA 标志，仅建议个人使用，不代表 NBA 官方授权。

图标直接由用户最后确认的极简库里压腕生成图等比例缩放，未重新生成或替换。
