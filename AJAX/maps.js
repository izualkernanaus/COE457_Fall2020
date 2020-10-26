// key = 5TwUUxcL9aMtsqYEIrN9DHWACLUvTh1j

// function copied from http://detectmobilebrowsers.com/

//window.isMobileOrTablet = window.isMobileOrTablet || isMobileOrTablet;

function isMobileOrTablet() {
   return true;
}

function showmap(){
var map = tt.map({
    key: '5TwUUxcL9aMtsqYEIrN9DHWACLUvTh1j',
    container: 'map',
    style: 'tomtom://vector/1/basic-main',
    dragPan: !isMobileOrTablet()
});
map.addControl(new tt.FullscreenControl());
map.addControl(new tt.NavigationControl());
}
