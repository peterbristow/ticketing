import axios from 'axios';

const BuildClient = ({ req }) => {
  if (typeof window === 'undefined' ) {
    // On the server (for server-side rendering phase)
    return axios.create({
      baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers
    });
  } else {
    // on the browser
    // requests can be made with the base url of ''
    return axios.create({
      baseURL: '/'
    });
  }
};

export default BuildClient;
