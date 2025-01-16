const express = require('express');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');
const expressLayouts = require('express-ejs-layouts'); // 引入 express-ejs-layouts

const app = express();
const PORT = 3000;

// 设置模板引擎
app.set('view engine', 'ejs');
app.use(expressLayouts); // 使用 express-ejs-layouts

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

const postsDir = path.join(__dirname, 'posts');

function getAllPosts() {
  const files = fs.readdirSync(postsDir);
  
  const posts = files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const filePath = path.join(postsDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);

      const title = data.title || path.parse(file).name;
      const date = data.date || fs.statSync(filePath).mtime; 
      const description = data.description || content.substring(0, 50) + '...'; 
      
      return {
        slug: path.parse(file).name,
        title,
        date,
        description,
        content
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return posts;
}

let allPosts = getAllPosts();

app.get('/', (req, res) => {
  const latestPosts = allPosts.slice(0, 3);
  res.render('index', { latestPosts, layout: 'layout' }); // 指定布局文件
});

app.get('/posts', (req, res) => {
  res.render('posts', { posts: allPosts, layout: 'layout' }); // 指定布局文件
});

app.get('/posts/:slug', (req, res) => {
  const { slug } = req.params;
  const post = allPosts.find((p) => p.slug === slug);

  if (!post) {
    return res.status(404).send('文章不存在');
  }

  const htmlContent = marked.parse(post.content);
  res.render('post', { post, htmlContent, layout: 'layout' }); // 指定布局文件
});

app.get('/about', (req, res) => {
  res.render('about', { layout: 'layout' }); // 指定布局文件
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});