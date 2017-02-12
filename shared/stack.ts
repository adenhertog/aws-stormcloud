import { Build } from './build';

export class Stack {
  name: string;
  capabilities: string[];
  region: string;
  template: Build;
  builds: Build[];
}
