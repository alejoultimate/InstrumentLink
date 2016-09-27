var updater = require('nw-auto-updater');
var path = require('path');

updater.configure({
    'remoteManifest' : 'http://localhost:3000/versionInstrumentLink/{{version}}',
    'tmpManifest'    : path.resolve('tmp/update_manifest.json'),
    'tmpArchive'     : path.resolve('tmp/update_archive.zip'),
    'extractPath'    : path.resolve('.'),
    'nwGui'          : require('nw.gui'),

    'update-available' : function() {
        console.log('available');
        log('available');
    },
    'update-not-available' : function() {
        console.log('not available');
        log('not available');
    },
    'update-downloading' : function(state) {
        console.log('downloading, ' + state.percent + " %");
        log('downloading, ' + state.percent + " %");
    },
    'update-downloaded' : function() {
        console.log('zip downloaded');
        log('zip downloaded');
    },
    'update-installed' : function() {
        console.log('archive installed');
        log('archive installed');
    },
    'error' : function(e) {
        //console.error(e);
        log(e);
    }
});

updater.launch();
