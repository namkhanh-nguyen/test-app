// src/atoms/theme.ts
'use client';

import { atomWithStorage } from 'jotai/utils';

export const theme = atomWithStorage('light', false);