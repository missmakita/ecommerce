(function($) {
  var app = $.sammy('#main', function() {
    // VISTA HOME
    this.get('#/', function(context) {
      console.log(this);
      $.ajax({
        url: 'https://api.mercadolibre.com/sites/MLC/search?',
        data: {
          q: 'hogar',
          limit: '48'
        },
        dataType: 'json',
        
        success: function(response) {
          context.log('the page was loaded', response);
          let items = response.results;
          // Grab the template script:
          const source = $('#home').html();
          // Compile the template:
          const template = Handlebars.compile(source);
          // Pass our data to the template:
          let html = template(items);
          // Add the compiled html to the page:
          $('#main').html(html);
        }
      });
    });

    // VISTA CATEGORIA
    this.get('#/category', function(context) {
      console.log(this);
      $.ajax({
        url: 'https://api.mercadolibre.com/sites/MLC/search?',
        data: {
          q: 'living',
          limit: '48'
        },
        dataType: 'json',
        
        success: function(response) {
          context.log('the page was loaded', response);
          let items = response.results;
          // Grab the template script:
          const source = $('#category').html();
          // Compile the template:
          const template = Handlebars.compile(source);
          // Pass our data to the template:
          let html = template(items);
          // Add the compiled html to the page:
          $('#main').html(html);
        }
      });
    });

    // VISTA ITEM
    /*
    this.get('#/item/:id', function(context) {
      $.ajax({
        url: 'https://api.mercadolibre.com/items',
        id: this.id,
        dataType: 'json',

        success: function(response) {
          context.log('the page was loaded', response);
          let item = response;

          // Grab the template script:
          const source = $('#item').html();
          // Compile the template:
          const template = Handlebars.compile(source);
          // Pass our data to the template:
          let html = template(item);
          // Add the compiled html to the page:
          $('#main').html(html);
        }
      });
    }); */

    $(function() {
      app.run('#/');
    });

    // BUSCADOR 
    let keyword = '';
    $('#searchBtn').click(function() {
      keyword = $('#searchText').val();
      console.log(keyword);
      // Grab the template script:
      const source = $('#search').html();
      // Compile the template:
      const template = Handlebars.compile(source);

      // Define our data object
      let context = '';
      $.get(`https://api.mercadolibre.com/sites/MLC/search?q=${keyword}`, function(data) {
        context = data.results;
        console.log(context);

        // Pass our data to the template:
        let html = template(context);

        // Add the compiled html to the page:
        $('#main').html(html);

        // Manually trigger a hashchange to start the app.
        $(window).trigger('hashchange');
      });
    });
  });
})(jQuery);

/*
// PAGE HOME
function getAllProducts() {
  // Grab the template script:
  const source = $('#allproducts-template').html();
  
  // Compile the template:
  const template = Handlebars.compile(source);
  // Define our data object
  let products = '';
  $.get('https://api.mercadolibre.com/sites/MLC/search?q=celular&limit=48', function(data) {
    products = data.results;
    console.log(products);
    // Pass our data to the template:
    let html = template(products);
    // Add the compiled html to the page:
    $('#main').html(html);
    // Manually trigger a hashchange to start the app.
    $(window).trigger('hashchange');
  });
}
// SEARCH RESULTS:
$('#searchBtn').click(function() {
  let keyword = $('#searchText').val();
  console.log(keyword);
  $(function(keyword) {
    // Grab the template script:
    const source = $('#search-template').html();
    // Compile the template:
    const template = Handlebars.compile(source);
    // Define our data object
    let context = '';
    $.get(`https://api.mercadolibre.com/sites/MLC/search?q=${keyword}`, function(data) {
      context = data.results;
      console.log(context);
      // Pass our data to the template:
      let html = template(context);
      // Add the compiled html to the page:
      $('#main').html(html);
      // Manually trigger a hashchange to start the app.
      $(window).trigger('hashchange');
    });
  });
});
// VISTA PRODUCTO:
function getProductDetail(productID) {
  // Grab the template script:
  const source = $('#product-template').html();
  // Compile the template:
  const template = Handlebars.compile(source);
  // Define our data object
  let context = '';
  $.get(`https://api.mercadolibre.com/items/${productID}`, function(data) {
    context = data.results;
    console.log(context);
    // Pass our data to the template:
    let html = template(context);
    // Add the compiled html to the page:
    $('#main').html(html);
    // Manually trigger a hashchange to start the app.
    $(window).trigger('hashchange');
  });
} */