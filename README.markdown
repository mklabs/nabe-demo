# nabe-demo

This is a simple repository to get started with [nabe](https://github.com/mklabs/nabe).

## demo

* nodester
  * [testnabe.nodester.com](http://testnabe.nodester.com/)
* cloud foundry
  * [nabe.cloudfoundry.com](http://nabe.cloudfoundry.com/)

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
      
This repository comes with three different themes: dorothy, satorii and sammo. 

* dorothy is a port of [the starter template](https://github.com/cloudhead/dorothy) for [toto](http://cloudhead.io/toto). Directory structure is heavily inspired by toto.
* satorii is an adaptation to the well-known [satorii theme for wordpress](http://www.yukei.net/proyectos/satorii/english-doc/).
* sammo is based on satorii and uses [Sammy.js](https://github.com/quirkey/sammy) with [pushState](https://github.com/quirkey/sammy/tree/non-hash) to handle page transitions (see json api below).


      
## configuration

You can configure nabe, by modifying the _config.yml_ file. For example, if you want to set the blog author to 'John Doe', you could add or edit `author: John Doe` inside the `config.yml` file. Here are the defaults, to get you started:

    author:       'John Doe'                                # blog author
    title:        'a blog about ...'                        # site title
    description:  'not another blog engine.. well.. yes it is..'
    format:       'yyyy-mm-dd'                              # date format for articles
    culture:      'en'                                      # ideally, any valid jquery.global culture. either en, fr, ja, ru, es for now
    disqus:       ''                                        # disqus id
    summary:
      delim:      '\n##'                                    # summary delimiter

Check out [`/docs/config.html`](http://mklabs.github.com/nabe/docs/config.html) for more information.

       
### articles

You could then create a .markdown article file in the `articles/` folder, and make sure it has the following format:

    Title: What a node weekend !
    Author: John Doe
    Date: Apr 24 2011 17:08:00 GMT+0200 (CDT)

    There's no `sleep()` in JavaScript.. Nor does it have goto, Duh.
    

Tags are defined using the `Categories` property

    Categories: node, readme, blog


If you're familiar with wheat or toto, this should looks familiar. Basically the top of the file is in YAML format, and the rest of it is the blog post. They are delimited by an empty line `/\n\n/`, as you can see above. 

None of the information is mandatory, but it's strongly encouraged you specify it. Arbitrary metadata can be included in articles files, and accessed from the templates.

Articles are processed through [github-flavored-markdown](https://github.com/isaacs/github-flavored-markdown) converter thus providing you some useful hooks like mklabs/nabe#1 or mklabs/nabe@da9eee105bd4becb8dd2973bf660509b30ee2be2. Snippets of code are passed through [Prettify](http://code.google.com/p/google-code-prettify/) syntax highlighting.

Articles files may be placed in any directory, they're served regardless of where they are located in the `articles` directory (and a request on a valid dir would list all articles in that directory and any subdirectories, if any markdown file is available for that URL)

### pages

pages, such as home, about, etc go in the `templates/pages` folder. Basically, if any file or folder is matching given url, nabe will look for similar files in `pages`, allowing you to render a simple about.html to `/about` url. 

One can easily add pages just by creating new files in `pages` folder.

### sidebars

Sidebar file allow you to define a simple sidebar that you can later use in your templates and pages, heavily inspired by [gollum](http://github.com/github/gollum). It's not as brilliant and is roughly implemented but you can use a custom `_sidebar.markdown` file in your `artciles` folder, its content would be available in your template files like so:

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
        
        
#### tests

There's a basic tests suite to make sure it's working properly, you can run them if you want. You must have [vows](http://vowsjs.org/) and [api-easy](http://indexzero.github.com/api-easy/) installed to run the tests. Just run `npm install api-easy` if that's not the case.

Run `vows tests/*.js --spec` to run the simple test suite that quickly validates different json response from the server (must be started).