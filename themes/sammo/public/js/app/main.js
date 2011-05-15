/**
 * This file is your application's base JavaScript file;
 * it is loaded into the page by requirejs (using data-main attribute)
 * in index.html. You can write code in this file, use it to
 * express dependencies on other files, or both. 
 *
 * Generally, this file should be used only for bootstrapping code;
 *
 * Actual functionality should be placed in other files inside
 * the public/js/app directory.
 *
 * You can specify dependencies on other by using proper 
 * dependencies array when using define/require
 *
 *    define(['dep1', 'dep2'], function(){})
 *
 *    require(['dep1', 'dep2'], function(){})
 *
 * The principal difference between require/define is that define 
 * is used to specify ASM module that you could later require in your own code.
 *
 * Finally, note that you do not need to express all of your
 * application's dependencies in this one file; individual files
 * can express their own dependencies as well.
 */
(function($, global, undefined) {
  
  // Configure RequireJS
  require({
    
    baseUrl: '/js/',
    
    // specify any external libs path (consider using a layer?)
    paths: {
      'jquery':           'libs/jquery',
      'sammy':            'libs/sammy',
      'jquery.tmpl':      'libs/jquery.tmpl'
    },
    
    // Load jQuery before any other scripts
    priority: ['jquery']
  });
  
  // Load scripts.
  require(['jquery', 'jquery.tmpl', 'sammy',
  'text!app/views/index.html', 'text!app/views/post.html', 'text!app/views/page.html', 'text!app/views/archives.html'], 
  
  function($, tmpl, Sammy, index, post, page, archives) {
    
    var content, loading, first = true,
    
    delegator = function(target) {
      
      var ctrl = controller[target];
      
      if(!ctrl) throw new Error('invalid target');
      
      return function(ctx, splat){
        var p = ctx.path.replace('#', ''),
        self = this, args = arguments;
        
        if(first) {
          // prevent first request
          first = false;
          return;
        }
        
        loading.addClass('active');
        content.addClass('disabled');
        $.getJSON(p, function(json) {
          Array.prototype.push.call(args, json);
          loading.removeClass('active');
          content.removeClass('disabled');
          ctrl.apply(controller, args);
        });
      };
    },
    
    controller = {
        
      index: function(ctx, splat, response) {
        console.log('index: ', ctx, response);
        content.html(
            $.tmpl('tmpl.index', response).appendTo($('<div />'))
        );  
      },
      
      post: function(ctx, splat, response) {
        console.log('post: ', ctx, response);
        content.html(
            $.tmpl('tmpl.post', response).appendTo($('<div />'))
        );
      },
      
      page: function(ctx, splat, response) {
        console.log('page: ', ctx, response);
        content.html(
            $.tmpl('tmpl.page', response).appendTo($('<div />'))
        );
      },
      
      archives: function(ctx, splat, response) {
        console.log('archives: ', ctx, response);
        content.html(
            $.tmpl('tmpl.archives', response).appendTo($('<div />'))
        );
      }
    };
    
    // compile them for later
    $.template('tmpl.index', index);
    $.template('tmpl.post', post);
    $.template('tmpl.page', page);
    $.template('tmpl.archives', archives);
    
    var app = Sammy('body', function(context) {

      // Set up routes
      this.get('/', delegator('index'));
      this.get(/\/article\/([^\s]+)/, delegator('post'));
      this.get(/\/[a-f0-9]{40}\/(.+)\/?/, delegator('post'));
      this.get(/\/tag\/([^\s]+)/, delegator('index'));
      this.get(/\/category\/([^\s]+)/, delegator('index'));
      this.get('/archives/:year/:month', delegator('archives'));
      this.get('/archives/:year', delegator('archives'));
      this.get('/archives', delegator('archives'));
      
      this.get('/:page', delegator('page'));

    });

    $(function(){
      content = $('#content');
      loading = $('.content-loading');
      app.run();
    });
    
  });
  
  
})(this.jQuery, this);