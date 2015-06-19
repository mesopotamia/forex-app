(function() {
  'use strict';

  angular
    .module('forex')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
