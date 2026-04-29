# Copyright (C) 2023 ading2210
# see README.md for more information

"""
Token-based authentication module for the web version
Handles token generation, validation, and revocation
"""

import secrets
import time
from datetime import datetime, timedelta
from typing import Optional, Dict, Tuple

class TokenManager:
    def __init__(self, token_expiry_hours: int = 24):
        self.tokens: Dict[str, Dict] = {}
        self.token_expiry_hours = token_expiry_hours
        self.token_length = 32
    
    def generate_token(self) -> str:
        """
        Generate a new secure token
        Returns a random 32-character token
        """
        token = secrets.token_hex(self.token_length // 2)
        
        expiry_time = datetime.utcnow() + timedelta(hours=self.token_expiry_hours)
        self.tokens[token] = {
            "created_at": datetime.utcnow().isoformat(),
            "expires_at": expiry_time.isoformat(),
            "last_used": datetime.utcnow().isoformat(),
            "ip_address": None,
            "user_agent": None
        }
        
        return token
    
    def validate_token(self, token: str) -> Tuple[bool, Optional[str]]:
        """
        Validate a token
        Returns (is_valid, error_message)
        """
        if not token:
            return False, "Token is empty"
        
        if token not in self.tokens:
            return False, "Token not found"
        
        token_data = self.tokens[token]
        expires_at = datetime.fromisoformat(token_data["expires_at"])
        
        if datetime.utcnow() > expires_at:
            # Token expired - remove it
            del self.tokens[token]
            return False, "Token expired"
        
        # Update last used time
        token_data["last_used"] = datetime.utcnow().isoformat()
        
        return True, None
    
    def revoke_token(self, token: str) -> bool:
        """
        Revoke a token
        Returns True if token was revoked, False if token didn't exist
        """
        if token in self.tokens:
            del self.tokens[token]
            return True
        return False
    
    def revoke_all_tokens(self) -> int:
        """
        Revoke all tokens
        Returns the number of tokens revoked
        """
        count = len(self.tokens)
        self.tokens.clear()
        return count
    
    def get_token_info(self, token: str) -> Optional[Dict]:
        """
        Get information about a token
        Returns token metadata or None if token doesn't exist
        """
        if token in self.tokens:
            data = self.tokens[token].copy()
            data["token"] = token[:8] + "..." # Don't expose full token
            return data
        return None
    
    def cleanup_expired_tokens(self) -> int:
        """
        Remove all expired tokens
        Returns the number of tokens removed
        """
        expired_tokens = []
        for token, data in self.tokens.items():
            expires_at = datetime.fromisoformat(data["expires_at"])
            if datetime.utcnow() > expires_at:
                expired_tokens.append(token)
        
        for token in expired_tokens:
            del self.tokens[token]
        
        return len(expired_tokens)
    
    def get_all_tokens_count(self) -> int:
        """Get the total number of active tokens"""
        return len(self.tokens)


# Global token manager instance
token_manager = TokenManager(token_expiry_hours=24)
