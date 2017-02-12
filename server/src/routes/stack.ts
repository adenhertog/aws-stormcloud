import { Router } from 'express';
import { Cloudformation } from '../services/cloudformation';
import { safeLoad, safeDump } from 'js-yaml';
import { join } from 'path';
import * as fs from 'fs'

const stack = Router();
const stackDir = join(__dirname, '..', 'stacks');

function readFiles(dirname, onFileContent, onError) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    filenames.forEach(function(filename) {
      fs.readFile(join(dirname, filename), 'utf-8', function(err, content) {
        if (err) {
          onError(err);
          return;
        }
        onFileContent(filename, content);
      });
    });
  });
}


// GET stack listing
stack.get('/', function(req, res, next) {
  const stacks = [];
  
  fs.readdir(stackDir, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).end();
    } else {
      readFiles(stackDir,
        (filename, content) => {
          const configuration = safeLoad(content);
          stacks.push(configuration);
          if (stacks.length === files.length) {
            res.send(stacks);
          }
        }, 
        (error) => {
          console.error(error);
          res.status(500).send();
      });
    }
  });
});

// POST create a new stack 
stack.post('/', function(req, res, next) {
  const stack = req.body;
  const filename = stack.name + '.yml';
  const filepath = join(__dirname, '..', 'stacks', filename);
  const stackYaml = safeDump(stack);
  fs.writeFile(filepath, stackYaml, (err) => {
    new Cloudformation().create(stack);
    res.status(201).end();
  });
});

// PUT update an existing stack 
stack.put('/:name', function(req, res, next) {
  const stack = req.body;
  const filename = req.params['name'] + '.yml';
  const filepath = join(__dirname, '..', 'stacks', filename);
  const stackYaml = safeDump(req.body);
  fs.writeFile(filepath, stackYaml, (err) => {
    new Cloudformation().update(stack);
    res.status(204).end();
  });
});

// DELETE remove a stack
stack.delete('/:name', function(req, res, next) {
  const name = req.params['name'];
  const filename = name + '.yml';
  const filepath = join(__dirname, '..', 'stacks', filename);
  fs.unlink(filepath, (err) => {
    if (err) {
      return res.status(500).end();
    }
    new Cloudformation().delete(name);
    res.status(204).end();
  });
})

export default stack;
