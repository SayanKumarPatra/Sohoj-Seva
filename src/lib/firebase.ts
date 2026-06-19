import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import firebaseConfig from "../../firebase-applet-config.json";

export const isPlaceholderFirebase = !firebaseConfig || 
  !firebaseConfig.projectId || 
  firebaseConfig.projectId === "" ||
  firebaseConfig.projectId === "YOUR_PROJECT_ID" ||
  firebaseConfig.projectId.includes("remixed") ||
  firebaseConfig.apiKey === "YOUR_API_KEY" ||
  firebaseConfig.apiKey.includes("remixed");

// Normalize configuration dynamically if RTDB URL is provided under firestoreDatabaseId or databaseURL
const normalizedConfig = { ...firebaseConfig } as any;
const isRTDBUrl = (url: string) => url && (url.includes("firebaseio.com") || url.startsWith("http://") || url.startsWith("https://"));

if (normalizedConfig.firestoreDatabaseId && isRTDBUrl(normalizedConfig.firestoreDatabaseId)) {
  normalizedConfig.databaseURL = normalizedConfig.firestoreDatabaseId;
}

const app = initializeApp(normalizedConfig);

// Initialize real-time database using the provided databaseURL
export const rtdb = normalizedConfig.databaseURL ? getDatabase(app) : null;

// Initialize and export the firestore database instance (disable/nullify if RTDB is active to prevent GRPC/Permission denied errors on client)
export const db = rtdb ? null : getFirestore(app, normalizedConfig.firestoreDatabaseId);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
      email: null,
      emailVerified: null,
      isAnonymous: null,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

