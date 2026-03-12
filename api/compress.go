package handler

import (
	"compress/gzip"
	"io"
	"net/http"
	"fmt"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	// 1. Gestion du CORS (Indispensable pour que React puisse appeler l'API)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	// Répondre immédiatement aux requêtes de vérification (Preflight)
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	// 2. Vérifier que c'est bien une requête POST
	if r.Method != http.MethodPost {
		http.Error(w, "Méthode non autorisée", http.StatusMethodNotAllowed)
		return
	}

	// 3. Récupérer le fichier envoyé
	file, header, err := r.FormFile("file")
	if err != nil {
		http.Error(w, "Impossible de lire le fichier", http.StatusBadRequest)
		return
	}
	defer file.Close()

	// 4. Préparer les headers de la réponse
	// On force le navigateur à télécharger le fichier avec l'extension .gz
	outputName := fmt.Sprintf("%s.gz", header.Filename)
	w.Header().Set("Content-Type", "application/gzip")
	w.Header().Set("Content-Disposition", "attachment; filename="+outputName)

	// 5. Initialiser la compression Gzip
	gw := gzip.NewWriter(w)
	
	// Attention : L'ordre des defer est important. 
	// Le writer gzip doit être fermé avant que la réponse HTTP ne soit finalisée.
	defer gw.Close()

	// 6. Copier les données du fichier original vers le compresseur
	_, err = io.Copy(gw, file)
	if err != nil {
		// Ici, on ne peut plus vraiment envoyer un http.Error car les headers 
		// de succès ont déjà été envoyés. On log simplement l'erreur.
		return
	}
}