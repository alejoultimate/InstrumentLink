module.exports = {
  path: '/versionInstrumentLink/:url',
  proxy: false,
  template: {
    "url": function(params) {
      var lastVersion = "0.0.2";
      if ( params.url != lastVersion ) {
        return "http://edgalolo:Carimo6034@inmdecvd02.suranet.com:4747/svn/salud/DINAMICA/Instrument-Link/versiones/" + lastVersion + "/update_archive.zip";
      } else {
        return;
      }
    },
    "name": "My Release Name",
    "notes": "Theses are some release notes innit",
    "pub_date": "2016-09-23T12:29:53+01:00"
  }
};
