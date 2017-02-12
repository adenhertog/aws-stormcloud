import { Router } from 'express';
import { BuildArtifacts } from '../services/buildArtifacts';

const buildRoutes = Router();

/* GET list of build artifacts for a repository. */
buildRoutes.get('/:repository', function(req, res, next) {
  new BuildArtifacts().get(req.params['repository'])
    .then(builds => res.send(builds));
});

export default buildRoutes;
