import { Build } from '../../../shared/build'
import { S3 } from 'aws-sdk';
import { Promise } from 'es6-promise';

const maxResultsPerBranch = 20;
const branchPattern = '(master|develop)';
const region = 'ap-southeast-2';
const buildBucket = 'ftr-builds';
const folderStructure = '(.*?)/(.*?)/(.*?)'; // 

export class BuildArtifacts {

  private s3: S3;

  constructor() {
    this.s3 = new S3({ region });
  }

  get(repository: string): Promise<Array<Build>> {
    const listParam: S3.ListObjectsRequest = {
      Bucket: buildBucket,
      Prefix: repository
    };

    return this.s3.listObjects(listParam)
      .promise()
      .then(objects => {
        console.log(objects.Contents);

        return objects.Contents.map(object => {
          const build = new Build();
          build.repository = repository;
          return build;
        });

      });

  }

}
