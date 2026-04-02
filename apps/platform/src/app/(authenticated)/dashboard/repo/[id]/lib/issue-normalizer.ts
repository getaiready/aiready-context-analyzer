import type { Repository } from '@/lib/db';
import type { AnalysisData } from '@/lib/storage';
import { ToolName } from '@aiready/core/client';

export interface NormalizedIssue {
  tool: string;
  locations: Array<{ path: string; line?: number }>;
  message: string;
  action?: string;
  severity: string;
  type: string;
  [key: string]: unknown;
}

/**
 * Normalize issues from analysis breakdown for easy filtering/display
 */
export function normalizeIssues(
  analysis: AnalysisData | null,
  repo: Repository
): NormalizedIssue[] {
  const allIssues: NormalizedIssue[] = [];
  if (!analysis?.breakdown) return allIssues;

  // Determine the likely project root to relativize paths
  const repoName = repo.name.split('/').pop() || repo.name;
  const pathPrefixRegex = new RegExp(
    `(?:.*\\/repo-[a-f0-9-]+\\/|.*\\/${repoName}\\/)`,
    'g'
  );

  const cleanPath = (p: string) => {
    if (!p) return p;
    return p.replace(pathPrefixRegex, '');
  };

  const cleanPathInText = (text: string) => {
    if (!text) return text;
    return text.replace(pathPrefixRegex, '');
  };

  Object.entries(analysis.breakdown).forEach(
    ([toolName, toolData]: [string, any]) => {
      if (!toolData || !toolData.details || !Array.isArray(toolData.details))
        return;

      toolData.details.forEach((issue: any) => {
        if (!issue) return;

        // Normalize locations (files/lines)
        const locations: Array<{ path: string; line?: number }> = [];

        if (issue.location?.file) {
          locations.push({
            path: cleanPath(issue.location.file),
            line: issue.location.line,
          });
        }

        if (issue.file && !issue.location?.file) {
          locations.push({ path: cleanPath(issue.file), line: issue.line });
        }
        if (issue.file1)
          locations.push({ path: cleanPath(issue.file1), line: issue.line1 });
        if (issue.file2)
          locations.push({ path: cleanPath(issue.file2), line: issue.line2 });
        if (issue.fileName && locations.length === 0) {
          locations.push({ path: cleanPath(issue.fileName) });
        }

        if (Array.isArray(issue.affectedPaths)) {
          issue.affectedPaths.forEach((p: string) => {
            if (p && typeof p === 'string')
              locations.push({ path: cleanPath(p) });
          });
        }

        // Normalize message
        let msg = issue.message || issue.description || issue.title || '';
        msg = cleanPathInText(msg);

        // Normalize recommendation/action
        let act =
          issue.suggestion ||
          issue.action ||
          (Array.isArray(issue.recommendations)
            ? issue.recommendations[0]
            : issue.recommendation);

        if (act && typeof act === 'string') {
          act = cleanPathInText(act);
        }

        if (!msg) {
          if (typeof issue === 'string') msg = issue;
          else if (act && typeof act === 'string') {
            msg = act;
            act = undefined;
          } else {
            msg = 'Issue detected';
          }
        }

        if (toolName === ToolName.PatternDetect && issue.similarity) {
          msg = `${issue.patternType ? issue.patternType.charAt(0).toUpperCase() + issue.patternType.slice(1) : 'Duplicate'} (${Math.round(issue.similarity * 100)}% similarity)`;
        }

        allIssues.push({
          ...issue,
          tool: toolName,
          locations,
          message: msg,
          action: act,
          severity:
            issue.severity ||
            (issue.priority === 'high' ? 'critical' : 'major'),
          type: issue.type || issue.category || 'logic',
        });
      });
    }
  );

  return allIssues;
}
