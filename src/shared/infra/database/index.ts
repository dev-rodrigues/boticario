import { createConnection } from 'typeorm';

class ConnectionDatabase {
  public async connect() {
    let retries = 5;

    while(retries) {
      try {
        await createConnection()
        break;
      } catch(err) {
        console.log(err);
        retries -= 1
        await new Promise(res => setTimeout(res, 5000)) 
      }
    }
  }
}

export default ConnectionDatabase