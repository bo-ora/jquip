  // <modified> for noConflict implementation purposes
  ;jquip['noConflict'] = function(deep) {
    if(window['$'] === jquip) {
      window['$'] = _$;
    }

    if(deep && window['jquip'] === jquip) {
      window['jquip'] = _jquip;
    }

    return jquip;
  };

  // <modified> for noConflict implementation purposes
  window['$'] = window['jquip'] = jquip;

})(window)