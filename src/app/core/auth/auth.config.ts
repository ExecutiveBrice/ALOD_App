/**
 * Contrat du fournisseur d'authentification. Les valeurs sont déclarées dans
 * l'environnement afin que le client consomme le contrat du backend tel quel.
 */
export interface AuthBackendConfig {
  /** Chemin de connexion du contrat backend. */
  loginPath: string;
  /** URL du renouvellement. Omettez-la si le backend ne propose pas de refresh token. */
  refreshPath?: string;
  /** Noms des champs de connexion attendus par le backend. */
  usernameField: string;
  passwordField: string;
  /** Nom des champs retournés par le backend. */
  accessTokenField: string;
  refreshTokenField?: string;
  /** Nom du champ attendu par l'endpoint de renouvellement. */
  refreshRequestField: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}
