import { Stack } from '../../../shared/stack'
import { CloudFormation } from 'aws-sdk';

export class Cloudformation {
  constructor() {
  }

  private toUpdateParams(stack: Stack): CloudFormation.UpdateStackParams {
    const params: CloudFormation.UpdateStackParams = {
      StackName: stack.name,
      TemplateBody: null,
      TemplateURL: null,
      UsePreviousTemplate: true,
      StackPolicyDuringUpdateBody: null,
      StackPolicyDuringUpdateURL: null,
      Parameters: [],
      Capabilities: stack.capabilities,
      ResourceTypes: [],
      StackPolicyBody: null,
      StackPolicyURL: null,
      NotificationARNs: null,
      Tags: null
    };
    return params;
  }

  create(stack: Stack) {

  }

  update(stack: Stack) {
    const cfn = new CloudFormation({ region: stack.region });
    
    const params = this.toUpdateParams(stack);
    cfn.updateStack(params, (err, data) => {
      console.log(err);
    });
  }

  delete(name: string) {

  }

}
