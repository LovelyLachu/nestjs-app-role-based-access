import * as dotenv from 'dotenv';

export class ConfigService {
    //Setup ENV
    private readonly envConfig: Record<string, string>;
    constructor() {
        const result = dotenv.config();

        if (result.error) {
            this.envConfig = process.env;
        } else {
            this.envConfig = result.parsed;
        }
    }
    //Prepare env get method
    public get(key: string): string {
        return this.envConfig[key];
    }
    //PORT config
    public async getPortConfig() {
        return this.get('PORT');
    }
    //mongodb connection URI config
    public async getMongoConfig() {
        return {
            uri: this.get('MONGO_URI')
        };
    }
}
