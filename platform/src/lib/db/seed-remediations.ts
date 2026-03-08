import { createRemediation } from '../lib/db/remediation';
import { v4 as uuidv4 } from 'uuid';

export async function seedInitialRemediations(repoId: string, userId: string) {
  const remediations = [
    {
      id: uuidv4(),
      repoId,
      userId,
      type: 'consolidation' as const,
      risk: 'low' as const,
      status: 'pending' as const,
      title: 'Consolidate Auth Utilities',
      description:
        'Found 3 identical implementations of JWT verification across the auth and legacy modules.',
      affectedFiles: ['src/auth/utils.ts', 'src/legacy/jwt.ts'],
      estimatedSavings: 120,
      priorityScore: 4.5,
      rank: 'P0' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      repoId,
      userId,
      type: 'refactor' as const,
      risk: 'medium' as const,
      status: 'pending' as const,
      title: 'Flatten User Profile Imports',
      description:
        'Deep import chains (6+ levels) detected in user settings. Flattening will reduce context window cost.',
      affectedFiles: ['src/features/user/settings/components/ProfileForm.tsx'],
      estimatedSavings: 45,
      priorityScore: 1.2,
      rank: 'P2' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      repoId,
      userId,
      type: 'rename' as const,
      risk: 'high' as const,
      status: 'pending' as const,
      title: 'Fix Terminology Drift in Core API',
      description:
        'Align "LegacyUser" and "ProfileData" to the "AccountIdentity" domain model. Critical for zero-shot agent grounding.',
      affectedFiles: ['src/api/identity.ts', 'src/models/user.ts'],
      estimatedSavings: 200,
      priorityScore: 5.0,
      rank: 'P0' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  for (const rem of remediations) {
    await createRemediation(rem);
  }

  console.log(
    `[Seed] Created ${remediations.length} initial remediations for repo ${repoId}`
  );
}
