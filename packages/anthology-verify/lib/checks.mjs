import {
  getAncestors,
  getAttribute,
  getClassList,
  getDescendants,
  hasAttribute,
  hasDescendantTag,
  positionForIndex,
} from './html-model.mjs';

const headingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

function createFinding(filePath, model, node, severity, code, message) {
  const location = positionForIndex(model.source, node?.start ?? 0);
  return {
    filePath,
    severity,
    code,
    message,
    tagName: node?.tagName ?? null,
    ...location,
  };
}

function isLabeledControl(node, model) {
  if (hasAttribute(node, 'aria-label') || hasAttribute(node, 'aria-labelledby')) {
    return true;
  }

  if (getAncestors(node, model).some((ancestor) => ancestor.tagName === 'label')) {
    return true;
  }

  const controlId = getAttribute(node, 'id');

  if (!controlId) {
    return false;
  }

  return model.nodes.some(
    (candidate) =>
      candidate.tagName === 'label' &&
      getAttribute(candidate, 'for') === controlId,
  );
}

export function runChecks(filePath, model) {
  const findings = [];
  const nodes = model.nodes;
  const navNodes = nodes.filter((node) => node.tagName === 'nav');
  const sectionLikeNodes = nodes.filter((node) => ['section', 'article'].includes(node.tagName));
  const formNodes = nodes.filter((node) => node.tagName === 'form');
  const headingNodes = nodes.filter((node) => headingTags.includes(node.tagName));

  if (!nodes.some((node) => node.tagName === 'main')) {
    findings.push(
      createFinding(
        filePath,
        model,
        nodes[0] ?? null,
        'warning',
        'main-landmark-missing',
        'Document should include a <main> landmark.',
      ),
    );
  }

  if (navNodes.length > 1) {
    for (const navNode of navNodes) {
      if (!hasAttribute(navNode, 'aria-label') && !hasAttribute(navNode, 'aria-labelledby')) {
        findings.push(
          createFinding(
            filePath,
            model,
            navNode,
            'warning',
            'nav-label-missing',
            'Multiple <nav> landmarks should have aria-label or aria-labelledby.',
          ),
        );
      }
    }
  }

  for (const node of sectionLikeNodes) {
    const labeled = hasAttribute(node, 'aria-label') || hasAttribute(node, 'aria-labelledby');

    if (!labeled && !hasDescendantTag(node, model, headingTags)) {
      findings.push(
        createFinding(
          filePath,
          model,
          node,
          'warning',
          'section-heading-missing',
          `<${node.tagName}> should include a heading or accessible label.`,
        ),
      );
    }
  }

  const formControls = nodes.filter((node) => ['input', 'select', 'textarea'].includes(node.tagName));

  for (const control of formControls) {
    const inputType = (getAttribute(control, 'type') ?? '').toLowerCase();

    if (control.tagName === 'input' && ['hidden', 'submit', 'reset', 'button', 'image'].includes(inputType)) {
      continue;
    }

    if (!isLabeledControl(control, model)) {
      findings.push(
        createFinding(
          filePath,
          model,
          control,
          'error',
          'form-control-unlabeled',
          `<${control.tagName}> is missing an associated label or aria-label.`,
        ),
      );
    }
  }

  for (const formNode of formNodes) {
    const formDescendants = getDescendants(formNode, model);

    for (const descendant of formDescendants) {
      if (descendant.tagName === 'button' && !hasAttribute(descendant, 'type')) {
        findings.push(
          createFinding(
            filePath,
            model,
            descendant,
            'warning',
            'button-type-missing',
            '<button> inside a form should declare type.',
          ),
        );
      }
    }
  }

  for (const node of nodes) {
    if (node.tagName === 'img' && !hasAttribute(node, 'alt')) {
      findings.push(
        createFinding(
          filePath,
          model,
          node,
          'error',
          'image-alt-missing',
          '<img> should include an alt attribute.',
        ),
      );
    }

    if (node.tagName === 'details' && !hasDescendantTag(node, model, ['summary'])) {
      findings.push(
        createFinding(
          filePath,
          model,
          node,
          'warning',
          'details-summary-missing',
          '<details> should include a <summary> child.',
        ),
      );
    }
  }

  let previousHeadingLevel = 0;

  for (const headingNode of headingNodes) {
    const currentLevel = Number.parseInt(headingNode.tagName.replace('h', ''), 10);

    if (previousHeadingLevel > 0 && currentLevel > previousHeadingLevel + 1) {
      findings.push(
        createFinding(
          filePath,
          model,
          headingNode,
          'warning',
          'heading-level-skip',
          `Heading level jumps from h${previousHeadingLevel} to h${currentLevel}.`,
        ),
      );
    }

    previousHeadingLevel = currentLevel;
  }

  const clusterNodes = nodes.filter((node) => getClassList(node).includes('cluster'));

  for (const clusterNode of clusterNodes) {
    const actions = [clusterNode, ...getDescendants(clusterNode, model)].filter((candidate) => {
      if (candidate.tagName === 'button') {
        return true;
      }

      if (candidate.tagName === 'a') {
        return getClassList(candidate).includes('button') || hasAttribute(candidate, 'data-variant');
      }

      return false;
    });

    if (actions.length >= 2) {
      const hasPrimary = actions.some((action) => getAttribute(action, 'data-variant') === 'primary');

      if (!hasPrimary) {
        findings.push(
          createFinding(
            filePath,
            model,
            clusterNode,
            'warning',
            'action-group-no-primary',
            'Multi-action cluster should usually include one primary action.',
          ),
        );
      }
    }
  }

  return findings;
}
