(function() {

  const serverUrl = 'http://127.0.0.1:3000';

  //
  // TODO: build the swim command fetcher here
  //
  const ajaxFetcher = (url, successCb, errorCb) => {
    $.ajax({
      type: 'GET',
      url: url,
      success: successCb,
      error: errorCb
    });
  };

  var swimError = () => {
    console.log('Failed to fetch a swim command');
  };

  var swimSuccess = (data) => {
    SwimTeam.move(data);
    setTimeout(ajaxFetcher.bind(null, serverUrl, swimSuccess, swimError), 5000);
  };

  //ajaxFetcher(serverUrl, swimSuccess, swimError);

  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUplaod = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: serverUrl + '/js/background.jpg',
      cache: false,
      contentType: false,
      processData: false,
      success: () => {
        // reload the page
        window.location = window.location.href;
      }
    });
  };

  $('form').on('submit', function(e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }

    ajaxFileUplaod(file);
  });

})();
