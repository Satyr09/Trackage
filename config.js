const env = process.env;

export default {

  port : env.PORT || 7010,
  host: env.HOST || '0.0.0.0',
  get serverURl(){
    return `http://${this.host}:${this.port}`
  },
  sessionSecret : 'YOUR SECRET HERE'

};
