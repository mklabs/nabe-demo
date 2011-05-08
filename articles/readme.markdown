Title: readme, yep readme
Author: John Doe
Date: Apr 26 2011 21:14:00 GMT-0500 (CDT)
Categories: node, readme, blog

# nabe

**nabe** is a git-powered, minimalist blog engine for coders.

A simple (but yet another) blog engine written in node. It basically takes the articles/ folder full of markdown post and serves them as a website. Posts are passed through [Markdown](http://daringfireball.net/projects/markdown/syntax), and snippets of code are passed through [Prettify](http://code.google.com/p/google-code-prettify/) syntax highlighting.

A blog is simply Git repository that adhere to a specific format. Posts are passed through [Markdown](http://daringfireball.net/projects/markdown/syntax) and can be edited in a number of ways depending on your needs. If not run through a valid git repo to provide article revisions and history, it falls back to the file system.

This project respectfully uses code from and thanks the authors of:

* [connect](https://github.com/senchalabs/connect)
* [wheat](https://github.com/creationix/wheat)
* [findit](https://github.com/substack/node-findit)
* [github-flavored-markdown](https://github.com/isaacs/github-flavored-markdown)
* [git-fs](https://github.com/creationix/node-git)
* [jquery-global](https://github.com/jquery/jquery-global)
* [jqtpl](https://github.com/kof/node-jqtpl)
* [yaml](https://github.com/visionmedia/js-yaml)
* [h5b-server-config for node](https://github.com/paulirish/html5-boilerplate-server-configs/blob/master/node.js)

## demo

* nodester
  * [testnabe.nodester.com](http://testnabe.nodester.com/)
* cloud foundry
  * [nabe.cloudfoundry.com](http://nabe.cloudfoundry.com/)
* amazon ec2
  * [ec2-46-137-98-7.eu-west-1.compute.amazonaws.com](http://ec2-46-137-98-7.eu-west-1.compute.amazonaws.com)
  
## Quickstart

using npm

    npm install nabe
    git clone git://github.com/you/yourrepo.git
    cd yourrepo
    node server.js

Boom. Navigate to http://localhost:5678 to see nabe in action. Check `config.xml` for other options.

Basically you need to run nabe within a git repo. Make sure to git [pack-refs](http://www.kernel.org/pub/software/scm/git/docs/git-pack-refs.html) and have some commits to test revisions and history. Note that this is **not** mandatory it falls back to the file system if either git or `.git/pack-refs` were not available.

This is possible thanks to [node-git](https://github.com/creationix/node-git), a thin wrapper around the command-line git command to read files out of a git repository as if they were local files.

## features

* Posts (...)
* Tags/Categories
* Markdown (using [github-flavored-markdown](https://github.com/isaacs/github-flavored-markdown) converter)
* code syntax highlighting ([Prettify](http://code.google.com/p/google-code-prettify/))
* revisions through git commits
* date formating using [jquery-global](https://github.com/jquery/jquery-global)
* rss feed
* Comments via Disqus
* simple route => page system
* github project page (generated remotely from readmes)
* rather comprehensive json api (mostly just GETs but still)

## how it works

* content is entirely managed through git; it falls back to the file if not available
* built with services like nodester or amazon ec2 in mind
* articles are stored as .markdown files, with embedded metadata (in yaml format)
* articles are passed through [github-flavored-markdown](https://github.com/isaacs/github-flavored-markdown) converter
* templating is done through node-jqtpl by default
* nabe is built right on top of Connect. It takes advantage of HTTP caching and uses html5-boilerplate server config startup file.
* comments are handled by disqus
* individual articles can be accessed through urls such as `/folder/subfolder/blogging-with-nabe` (thus folders can be seen as a way of providing simple hierarchical categories)
* relatedly, the list of articles in `/folder/subfolder/` can be accessed with the exact same url
* arbitrary metadata can be included in articles files, and accessed from the templates
* summaries are generated following the `delimiter` settings

## Documentation

Apart from the overview provided in this README.md file, nabe uses [docco](http://jashkenas.github.com/docco/) to provide comprehensive source code documentation. Check out [`/docs/nabe.html`](http://mklabs.github.com/nabe/docs/nabe.html) for more information.

## overview

You would start by installing _nabe_, with `npm install nabe` or then forking or
cloning the [nabe-demo](https://github.com/mklabs/nabe-demo) repo, to get a basic skeleton.

    git clone git://github.com/mklabs/nabe-demo.git weblog
    cd weblog/
    node server.js

You would then edit the template at will, it has the following structure:
    
    articles/                       # default posts folder (defined in config.yml)
    |
    themes/                         # default themes folder (defined in config.yml)
      |
      +- default/                   # theme folder (defined in config.yml)
        |
        +- public/                  # static files go here (js, css, img)
        |
        +- layout.html              # the main site layout, shared by all pages
        |
        +- index.html               # the default page loaded from `/`, it displays the list of articles
        |
        +- article.html             # the article (post) partial and page
        |
        +- feed.xml                 # the basic template for the rss feed
        |
        +- 404.html                 # the default 404 page
        |
        +- github.html              # page loaded from `/a-github-project`, following the github.user config
        |
        +- pages/                   # pages, such as about, contact etc go here
           |
           +- about.html            # the page loaded for `/about` url
           |
           +- whatever.html         # same goes for whatever page, loaded for `/whatever` url
           |
      +- yourtheme/                 # another theme folder

       
### articles

You could then create a .markdown article file in the `articles/` folder, and make sure it has the following format:

    Title: What a node weekend !
    Author: John Doe
    Date: Apr 24 2011 17:08:00 GMT+0200 (CDT)

    There's no `sleep()` in JavaScript.. Nor does it have goto, Duh.

If you're familiar with wheat or toto, this should looks familiar. Basically the top of the file is in YAML format, and the rest of it is the blog post. They are delimited by an empty line `/\n\n/`, as you can see above. 

None of the information is mandatory, but it's strongly encouraged you specify it. Arbitrary metadata can be included in articles files, and accessed from the templates.

Articles are processed through [github-flavored-markdown](https://github.com/isaacs/github-flavored-markdown) converter thus providing you some useful hooks like mklabs/nabe#1 or mklabs/nabe@da9eee105bd4becb8dd2973bf660509b30ee2be2. Snippets of code are passed through [Prettify](http://code.google.com/p/google-code-prettify/) syntax highlighting.

Articles files may be placed in any directory, they're served regardless of where they are located in the `articles` directory (and a request on a valid dir would list all articles in that directory and any subdirectories, if any markdown file is available for that URL)

<table>
  <thead><tr><th>URL</th><th></th></tr></thead>
  <tbody>
    <tr><td>/articles/test/a-blog-post</td><td>/articles/test/a-blog-post.markdown file</td></tr>
    <tr><td>/articles/test/a-second-blog-post</td><td>/articles/test/a-second-blog-post.markdown file</td></tr>
    <tr><td>/articles/test</td><td>a list of articles embedded in articles/test folder and its subfolders</td></tr>
    <tr><td>/articles/a-blog-post</td><td>/articles/a-blog-post.markdown file</td></tr>
  </tbody>
</table>

The special page file index.html will be used by default as the entrance page to your blog.

### pages

pages, such as home, about, etc go in the `templates/pages` folder. Basically, if any file or folder is matching given url, nabe will look for similar files in `pages`, allowing you to render a simple about.html to `/about` url. 

One can easily add pages just by creating new files in `pages` folder.

### github projects

Any projects that is hosted on github and publicly available (eg. not private), can have its own place on the generated site. Depending on settings defined in config.yml (user, ext), nabe will get the content of the classic README file for this particular project. A request to `/a-badass-project`, assuming you have `a-badass-project` hosted on github, will render `github.project.html` with readme's content.

### sidebars

Sidebar file allow you to define a simple sidebar that you can later use in your templates and pages, heavily inspired by [gollum](http://github.com/github/gollum). It's not as brilliant and is roughly implemented but you can use a custom `_sidebar.markdown` file in your `artciles` or `templates/pages` folder, its content would be available in your template files like so:

    {{if has_sidebar}}
    <div class="article-sidebar">
      {{html sidebar}}
    </div>
    {{/if}}


### json api

A simple JSON connect layer is listening for incoming request with `Accept` header set to `application/json` that, instead of serving html output (delivered by templates files), will respond the exact same model provided to the views as json objects. It basically means that any request done with something like `$.getJSON('./valid/route')` would get in return a json result (and one can easily think of building neat single-page app with framework like Sammy.js or Backbone). The sammo theme available in this repo uses [Sammy.js](https://github.com/quirkey/sammy) with [pushState](https://github.com/quirkey/sammy/tree/non-hash) to handle page transitions.

One can think of easily reuse server-side templates to provide a front-end application.

#### Examples on `./`


    { 
      config: 
       { hostAddress: 'localhost|nodester.com|amazonaws',
         port: 9606,
         articleDir: 'articles',
         themeDir: 'themes',
         theme: 'sammo',
         format: 'F',
         culture: 'fr',
         github: { user: 'mklabs', ext: 'markdown' },
         author: 'John Doe',
         title: 'Sammo',
         url: '/',
         description: 'Say hello to Sammo, a theme crafted with a tiny Sammy.js application that use pushState to handle page transitions',
         root: 'index',
         date: 'YYYY-mm-dd',
         disqus: '',
         ext: 'markdown',
         summary: { max: 150, delim: '\\n##' } } },
      articles: 
       [ { title: 'readme, yep readme',
           author: 'John Doe',
           date: 'mercredi 27 avril 2011 04:14:00',
           categories: [ 'node', 'readme', 'blog' ],
           markdown: '<p>nabe is a git-powered, minimalist blog engine for coders.</p>',
           name: 'readme' },
         { title: 'GitHub Flavored Markdown',
           author: 'John Doe',
           date: 'dimanche 24 avril 2011 17:08:00',
           categories: [ 'markdown' ],,
           markdown: '<h1>GitHub Flavored Markdown</h1>\n\n<p><em>View ...',
           name: 'syntax/github-flavored-markdown' },
         { title: 'Markdown loves you',
           author: 'John Doe',
           date: 'jeudi 7 avril 2011 04:14:00',
           categories: [Object],
           markdown: '...' }
        ]

It even has some basic tests to make sure it's working properly and you can run them if you want. You must have api-easy installed to run the tests. Just run `npm install api-easy` if that's not the case.

Then run `vows tests/*.js --spec` to run the simple test suite that quickly validates different json response from the server (must be started).

## deployment

### on your own server

nave is built on top of Connect and exports itself as a Connect sever: _server.js_.

    var nabe = require('./lib/nabe'),
    config = nabe.config;

    nabe.listen(config.port);
    
One can add connect layers, or layers that adds or alter nabe's feature with `nabe.use()`.

### on nodester

nabe was designed to work well with [nodester](http://nodester.com). Deploying on nodester is really easy, just ask for a nodester access by following these [instructions](http://nodester.com), create a nodester app with `nodester app create`, and push with `git push nodester master` (_replace testnabe with your application name_)

    git clone http://github.com/mklabs/nabe-demo testnabe
    cd testnabe
    nodester app create testnabe
    nodester app info testnabe

You'll get in return two important informations: port and gitrepo.

First copy paste the gitrepo from `nodester app info` and add it as a remote repository.

    git remote add nodester ec2-user@nodester.com:/replace/this/with/yours/1234-a123456789bc123d01e9c55c6f6af5a7.git
    
Then, change the `server.js` or `config.yml` (by adding a port property if necessary) file to change the port to the one nodester has assigned to your app. Also, you'll want to change hostAddress to `testnabe.nodester.com` (or whatever name you're using, it's namely used to control cross domain request).  Once done, simply git add, commit and push to get your app started

    git add .
    git commit -m "Changed port to nodester one"
    git push nodester master
    
Test [http://testnabe.nodester.com](http://testnabe.nodester.com).

## configuration

You can configure nabe, by modifying the _config.yml_ file. For example, if you want to set the blog author to 'John Doe', you could add or edit `author: John Doe` inside the `config.yml` file. Here are the defaults, to get you started:

    author:     'John Doe'                                # blog author
    title:      'a blog about ...'                        # site title
    url:        'example.com'                             # site root URL, namely used to control crossdomain request
    format:     'yyyy-mm-dd'                              # date format for articles
    culture:    'en'                                      # ideally, any valid jquery.global culture. either en, fr, ja, ru, es for now
    disqus:     ''                                        # disqus id
    summary:
      delim:    '\n##'                                    # summary delimiter

Check out [`/docs/config.html`](http://mklabs.github.com/nabe/docs/config.html) for more information.

## Thanks!

Tim Caswell([creationix](Tim Caswell)) and [Wheat](https://github.com/creationix/wheat), a really beautiful piece of node hacking. The pretiffy modules are directly coming from Wheat, the whole is heavily based on Wheat which inspired me this experiments. I'm using wheat since a few months now to blog and I really think that solutions like Jekyll or Wheat, both based on markdown (textile is also pretty good) are ideal and really pleasant to work with.

Also, a lot of ideas and inspiration is coming from:

* [gollum](http://github.com/github/gollum) - [Tom Preston-Werner](https://github.com/mojombo), [Rick Olson](https://github.com/technoweenie)
* [toto](https://github.com/cloudhead/toto) - [Alexis Sellier](https://github.com/cloudhead)
* [scanty](https://github.com/adamwiggins/scanty) - [Adam Wiggins](https://github.com/adamwiggins)