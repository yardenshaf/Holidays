import { CreateBucketCommand, S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import config from 'config';
import { readdirSync, readFileSync } from 'fs';
import { extname, join } from 'path';

const s3Connection = JSON.parse(JSON.stringify(config.get<object>('s3.connection')));

if (!config.get<boolean>('s3.isLocalStack')) delete s3Connection.endpoint;

const s3Client = new S3Client(s3Connection);

export async function createAppBucketIfNotExists() {
    try {
        const result = await s3Client.send(
            new CreateBucketCommand({
                Bucket: config.get<string>('s3.bucket'),
            }),
        );
        console.log(result);
    } catch (e) {
        console.log('bucket creation failed. silenting exception, bucket probably already exists', e);
    }
}

export async function testUpload() {
    try {
        const upload = new Upload({
            client: s3Client,
            params: {
                Bucket: config.get<string>('s3.bucket'),
                Key: 'test.txt',
                ContentType: 'text/plain',
                Body: 'hello world, localstack seems to work',
            },
        });

        const result = await upload.done();
        console.log('upload result:', result);
    } catch (e) {
        console.log('exception in test upload: ', e);
    }
}

export async function seedInitialImagesIfNeeded() {
    const bucket = config.get<string>('s3.bucket');
    const images = join(__dirname, '../images');

    const files = readdirSync(images);

    const tasks = files.map(async (file) => {
        const body = readFileSync(join(images, file));

        try {
            await new Upload({
                client: s3Client,
                params: {
                    Bucket: bucket,
                    Key: `seed/${file}`,
                    Body: body,
                    ContentType: `image/${extname(file).replace('.', '')}`,
                },
            }).done();

            console.log(`Seeded ${file}`);
        } catch (e) {
            console.log(`Skipping ${file}`, e);
        }
    });

    await Promise.allSettled(tasks);
}

export default s3Client;
