'use strict';

exports.config = {
  app_name: ['dlab_node'],
  logging: {
    level: 'info'
  },
  allow_all_headers: true,
  application_logging: {
    forwarding: {
      enabled: true,
      max_samples_stored: 100,
    }
  },
  attributes: {
    exclude: [
      'request.headers.cookie',
      'request.headers.authorization',
      'request.headers.proxyAuthorization',
      'request.headers.setCookie*',
      'request.headers.x*',
      'response.headers.cookie',
      'response.headers.authorization',
      'response.headers.proxyAuthorization',
      'response.headers.setCookie*',
      'response.headers.x*'
    ]
  }
};
