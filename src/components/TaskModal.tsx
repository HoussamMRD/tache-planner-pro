
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { X, PlusCircle, Info, Package, Users, Truck, InfoIcon, Trash2 } from "lucide-react";

interface Task {
  nomTache: string;
  affaire: { idAffaire: number, nom: string } | null;
  dateDebut: string;
  dateFin: string;
  statut: string;
  lots: Lot[];
  mainOeuvres: MainOeuvre[];
  engins: Engin[];
}

interface Lot {
  nomLot: string;
  articles: Article[];
}

interface Article {
  nomArticle: string;
  quantiteArticle: number;
  uniteArticle: string;
  prixUnitaireArticle: number;
}

interface MainOeuvre {
  fonctionMO: string;
  nbrMO: number;
}

interface Engin {
  typeEngin: string;
  nbrEngin: number;
}

const TaskModal = ({ closeModal, affaireId = 1, affaireName = "Project Name" }) => {
  const [currentSection, setCurrentSection] = useState(1);
  const todayDate = new Date().toISOString().split('T')[0];
  
  const [newTache, setNewTache] = useState<Task>({
    nomTache: '',
    affaire: { idAffaire: affaireId, nom: affaireName },
    dateDebut: todayDate,
    dateFin: '',
    statut: 'PLANIFIEE',
    lots: [],
    mainOeuvres: [],
    engins: []
  });

  const statusOptions = [
    { value: 'PLANIFIEE', label: 'Planifiée', icon: 'calendar' },
    { value: 'EN_COURS', label: 'En cours', icon: 'play-circle' },
    { value: 'TERMINEE', label: 'Terminée', icon: 'check-circle' },
    { value: 'ANNULEE', label: 'Annulée', icon: 'x-circle' }
  ];

  const getAffaireName = () => {
    return newTache.affaire?.nom || '';
  };

  const goToSection = (section: number) => {
    setCurrentSection(section);
  };

  const validateSection = (section: number) => {
    // Simple validation logic could be added here
    if (section === 1) {
      if (!newTache.nomTache) {
        toast.error("Veuillez saisir le nom de la tâche");
        return;
      }
      if (!newTache.dateDebut) {
        toast.error("Veuillez saisir la date de début");
        return;
      }
      if (!newTache.dateFin) {
        toast.error("Veuillez saisir la date de fin");
        return;
      }
    }
    
    // Move to next section
    setCurrentSection(section + 1);
  };

  const addLot = () => {
    setNewTache({
      ...newTache,
      lots: [...newTache.lots, { nomLot: '', articles: [] }]
    });
  };

  const removeLot = (index: number) => {
    const updatedLots = [...newTache.lots];
    updatedLots.splice(index, 1);
    setNewTache({
      ...newTache,
      lots: updatedLots
    });
  };

  const addArticle = (lotIndex: number) => {
    const updatedLots = [...newTache.lots];
    updatedLots[lotIndex].articles.push({
      nomArticle: '',
      quantiteArticle: 1,
      uniteArticle: 'unité',
      prixUnitaireArticle: 0
    });
    setNewTache({
      ...newTache,
      lots: updatedLots
    });
  };

  const removeArticle = (lotIndex: number, articleIndex: number) => {
    const updatedLots = [...newTache.lots];
    updatedLots[lotIndex].articles.splice(articleIndex, 1);
    setNewTache({
      ...newTache,
      lots: updatedLots
    });
  };

  const calculateLotTotal = (lot: Lot) => {
    return lot.articles.reduce((sum, article) => {
      return sum + (article.quantiteArticle * article.prixUnitaireArticle);
    }, 0);
  };

  const addMainOeuvre = () => {
    setNewTache({
      ...newTache,
      mainOeuvres: [...newTache.mainOeuvres, { fonctionMO: '', nbrMO: 1 }]
    });
  };

  const removeMainOeuvre = (index: number) => {
    const updatedMainOeuvres = [...newTache.mainOeuvres];
    updatedMainOeuvres.splice(index, 1);
    setNewTache({
      ...newTache,
      mainOeuvres: updatedMainOeuvres
    });
  };

  const addEngin = () => {
    setNewTache({
      ...newTache,
      engins: [...newTache.engins, { typeEngin: '', nbrEngin: 1 }]
    });
  };

  const removeEngin = (index: number) => {
    const updatedEngins = [...newTache.engins];
    updatedEngins.splice(index, 1);
    setNewTache({
      ...newTache,
      engins: updatedEngins
    });
  };

  const calculateEnginsTotal = () => {
    return newTache.engins.reduce((sum, engin) => sum + engin.nbrEngin, 0);
  };

  const isFormValid = () => {
    // More detailed validation logic can be implemented here
    return newTache.nomTache && newTache.dateDebut && newTache.dateFin;
  };

  const submitForm = () => {
    // Add submission logic here
    toast.success("Tâche planifiée avec succès");
    closeModal();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTache({
      ...newTache,
      [name]: value
    });
  };

  const updateLotName = (index: number, value: string) => {
    const updatedLots = [...newTache.lots];
    updatedLots[index].nomLot = value;
    setNewTache({
      ...newTache,
      lots: updatedLots
    });
  };

  const updateArticle = (lotIndex: number, articleIndex: number, field: string, value: any) => {
    const updatedLots = [...newTache.lots];
    updatedLots[lotIndex].articles[articleIndex] = {
      ...updatedLots[lotIndex].articles[articleIndex],
      [field]: value
    };
    setNewTache({
      ...newTache,
      lots: updatedLots
    });
  };

  const updateMainOeuvre = (index: number, field: string, value: any) => {
    const updatedMainOeuvres = [...newTache.mainOeuvres];
    updatedMainOeuvres[index] = {
      ...updatedMainOeuvres[index],
      [field]: value
    };
    setNewTache({
      ...newTache,
      mainOeuvres: updatedMainOeuvres
    });
  };

  const updateEngin = (index: number, field: string, value: any) => {
    const updatedEngins = [...newTache.engins];
    updatedEngins[index] = {
      ...updatedEngins[index],
      [field]: value
    };
    setNewTache({
      ...newTache,
      engins: updatedEngins
    });
  };

  return (
    <Card className="rounded-xl overflow-hidden shadow-2xl border-0 w-full max-w-4xl bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-600 text-white p-6 relative">
        <div className="flex items-center">
          <div className="bg-white text-blue-600 p-2 rounded-full mr-4">
            <InfoIcon size={24} />
          </div>
          <div>
            <h5 className="text-xl font-bold mb-0">Planifier une Nouvelle Tâche</h5>
            <p className="text-sm opacity-80"></p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full" 
          onClick={closeModal}
        >
          <X size={20} />
        </Button>
      </div>

      <div className="p-0">
        <form onSubmit={(e) => { e.preventDefault(); submitForm(); }}>
          {/* Progress Steps */}
          <div className="bg-gray-50 px-6 py-4">
            <div className="flex justify-between relative">
              {/* Progress line */}
              <div className="absolute top-[22px] left-0 right-0 h-1 bg-gray-200 z-0">
                <div 
                  className="h-full bg-gradient-to-r from-teal-500 to-blue-600 transition-all duration-300" 
                  style={{ width: `${((currentSection - 1) / 3) * 100}%` }}
                ></div>
              </div>
              
              {/* Steps */}
              {[1, 2, 3, 4].map((step) => (
                <div 
                  key={step}
                  className="flex flex-col items-center relative z-10"
                >
                  <div 
                    className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300
                    ${currentSection === step ? 'bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-lg' : 
                      currentSection > step ? 'bg-gradient-to-r from-teal-400 to-blue-500 text-white' : 
                      'bg-white border-2 border-gray-200 text-gray-400'}`}
                  >
                    {step}
                  </div>
                  <div className={`mt-2 text-xs font-medium ${currentSection >= step ? 'text-blue-700' : 'text-gray-500'}`}>
                    {step === 1 && "Informations"}
                    {step === 2 && "Lots & Articles"}
                    {step === 3 && "Main d'Œuvres"}
                    {step === 4 && "Engins"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 1: General Information */}
          {currentSection === 1 && (
            <div className="animate-in fade-in duration-300">
              <div className="p-6 border-b">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                    <Info size={20} />
                  </div>
                  <h6 className="text-lg font-semibold text-gray-800">Informations Générales</h6>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="nomTache" className="flex items-center gap-2 mb-1.5">
                      Nom Tâche <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="nomTache"
                      value={newTache.nomTache}
                      onChange={handleInputChange}
                      name="nomTache"
                      placeholder="Nom de la Tâche"
                      className="border-gray-300"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="affaire" className="flex items-center gap-2 mb-1.5">
                      Affaire
                    </Label>
                    <Input
                      id="affaire"
                      value={getAffaireName()}
                      className="bg-gray-50 border-gray-300"
                      readOnly
                    />
                  </div>

                  <div>
                    <Label htmlFor="dateDebut" className="flex items-center gap-2 mb-1.5">
                      Date Début <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="date"
                      id="dateDebut"
                      value={newTache.dateDebut}
                      onChange={handleInputChange}
                      name="dateDebut"
                      className="border-gray-300"
                      min={todayDate}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="dateFin" className="flex items-center gap-2 mb-1.5">
                      Date Fin <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="date"
                      id="dateFin"
                      value={newTache.dateFin}
                      onChange={handleInputChange}
                      name="dateFin"
                      className="border-gray-300"
                      min={newTache.dateDebut || todayDate}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="statut" className="flex items-center gap-2 mb-1.5">
                      Statut <span className="text-red-500">*</span>
                    </Label>
                    <select
                      id="statut"
                      value={newTache.statut}
                      onChange={handleInputChange}
                      name="statut"
                      className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 flex justify-end">
                <Button 
                  type="button" 
                  className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700"
                  onClick={() => validateSection(1)}
                >
                  Suivant
                </Button>
              </div>
            </div>
          )}

          {/* Section 2: Lots & Articles */}
          {currentSection === 2 && (
            <div className="animate-in fade-in duration-300">
              <div className="p-6 border-b">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                    <Package size={20} />
                  </div>
                  <h6 className="text-lg font-semibold text-gray-800">Lots et Articles</h6>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800 text-sm text-center mb-5">
                  <Info size={16} className="inline mr-2" /> Ajoutez les lots et les articles nécessaires
                </div>

                <div className="mb-5">
                  <Button 
                    type="button" 
                    onClick={addLot} 
                    variant="outline"
                    className="border-blue-600 text-blue-700 hover:bg-blue-50"
                  >
                    <PlusCircle size={18} className="mr-2" /> Ajouter Lot
                  </Button>
                </div>

                {newTache.lots.length > 0 && (
                  <div className="border rounded-lg overflow-hidden mb-6">
                    <table className="w-full">
                      <thead className="bg-gray-50 text-sm text-gray-700">
                        <tr>
                          <th className="px-4 py-3 text-left font-medium w-5/12">Nom du Lot</th>
                          <th className="px-4 py-3 text-left font-medium w-5/12">Articles</th>
                          <th className="px-4 py-3 text-center font-medium w-2/12">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {newTache.lots.map((lot, lotIndex) => (
                          <tr key={lotIndex} className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <Input
                                value={lot.nomLot}
                                onChange={(e) => updateLotName(lotIndex, e.target.value)}
                                placeholder="Nom du lot"
                                className="border-gray-300"
                              />
                            </td>
                            <td className="px-4 py-3">
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                {lot.articles.length} article(s)
                              </Badge>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <Button
                                type="button" 
                                onClick={() => addArticle(lotIndex)}
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 mr-1"
                              >
                                <PlusCircle size={16} />
                              </Button>
                              <Button
                                type="button" 
                                onClick={() => removeLot(lotIndex)}
                                variant="ghost" 
                                size="sm"
                                className="text-red-600 hover:text-red-800 hover:bg-red-50"
                              >
                                <Trash2 size={16} />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Articles Details */}
                {newTache.lots.map((lot, lotIndex) => (
                  <div key={lotIndex} className="mt-6">
                    <h6 className="flex items-center text-blue-800 font-medium mb-3">
                      <Package size={18} className="mr-2" />
                      Articles du Lot: {lot.nomLot || 'Nouveau Lot'}
                    </h6>
                    
                    {lot.articles.length > 0 ? (
                      <div className="border rounded-lg overflow-hidden mb-3">
                        <table className="w-full">
                          <thead className="bg-gray-50 text-xs text-gray-700">
                            <tr>
                              <th className="px-3 py-2 text-left font-medium">Article</th>
                              <th className="px-3 py-2 text-left font-medium w-2/12">Quantité</th>
                              <th className="px-3 py-2 text-left font-medium w-2/12">Unité</th>
                              <th className="px-3 py-2 text-left font-medium w-2/12">Prix Unitaire</th>
                              <th className="px-3 py-2 text-left font-medium w-2/12">Total</th>
                              <th className="px-3 py-2 text-center font-medium w-1/12"></th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {lot.articles.map((article, articleIndex) => (
                              <tr key={articleIndex} className="hover:bg-gray-50 text-sm">
                                <td className="px-3 py-2">
                                  <Input
                                    value={article.nomArticle}
                                    onChange={(e) => updateArticle(lotIndex, articleIndex, 'nomArticle', e.target.value)}
                                    placeholder="Nom article"
                                    className="border-gray-300 text-sm h-8"
                                  />
                                </td>
                                <td className="px-3 py-2">
                                  <Input
                                    type="number"
                                    value={article.quantiteArticle}
                                    onChange={(e) => updateArticle(lotIndex, articleIndex, 'quantiteArticle', Number(e.target.value))}
                                    min="1"
                                    className="border-gray-300 text-sm h-8"
                                  />
                                </td>
                                <td className="px-3 py-2">
                                  <select
                                    value={article.uniteArticle}
                                    onChange={(e) => updateArticle(lotIndex, articleIndex, 'uniteArticle', e.target.value)}
                                    className="w-full h-8 text-sm px-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  >
                                    <option value="unité">unité</option>
                                    <option value="m">mètre (m)</option>
                                    <option value="m²">mètre carré (m²)</option>
                                    <option value="m³">mètre cube (m³)</option>
                                    <option value="kg">kilogramme (kg)</option>
                                    <option value="L">litre (L)</option>
                                    <option value="h">heure (h)</option>
                                    <option value="jour">jour</option>
                                  </select>
                                </td>
                                <td className="px-3 py-2">
                                  <div className="flex items-center">
                                    <Input
                                      type="number"
                                      value={article.prixUnitaireArticle}
                                      onChange={(e) => updateArticle(lotIndex, articleIndex, 'prixUnitaireArticle', Number(e.target.value))}
                                      min="0"
                                      step="0.01"
                                      className="border-gray-300 text-sm h-8"
                                    />
                                    <span className="ml-2 text-xs text-gray-500">DH</span>
                                  </div>
                                </td>
                                <td className="px-3 py-2 font-medium">
                                  {(article.quantiteArticle * article.prixUnitaireArticle).toFixed(2)} DH
                                </td>
                                <td className="px-3 py-2 text-center">
                                  <Button
                                    type="button"
                                    onClick={() => removeArticle(lotIndex, articleIndex)}
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 h-7 w-7 p-0"
                                  >
                                    <Trash2 size={14} />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-8 border rounded-lg bg-gray-50 text-gray-500">
                        Aucun article dans ce lot
                      </div>
                    )}
                    
                    {lot.articles.length > 0 && (
                      <div className="flex justify-end mt-2">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1.5 text-sm">
                          Total Lot: {calculateLotTotal(lot).toFixed(2)} DH
                        </Badge>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="bg-gray-50 p-4 flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="border-gray-300"
                  onClick={() => goToSection(1)}
                >
                  Précédent
                </Button>
                <Button 
                  type="button" 
                  className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700"
                  onClick={() => validateSection(2)}
                >
                  Suivant
                </Button>
              </div>
            </div>
          )}

          {/* Section 3: Main d'Oeuvre */}
          {currentSection === 3 && (
            <div className="animate-in fade-in duration-300">
              <div className="p-6 border-b">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                    <Users size={20} />
                  </div>
                  <h6 className="text-lg font-semibold text-gray-800">Main d'Œuvre</h6>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800 text-sm text-center mb-5">
                  <Info size={16} className="inline mr-2" /> Spécifiez les besoins en main d'œuvre pour cette tâche
                </div>

                <div className="mb-5">
                  <Button 
                    type="button" 
                    onClick={addMainOeuvre} 
                    variant="outline"
                    className="border-amber-600 text-amber-700 hover:bg-amber-50"
                  >
                    <PlusCircle size={18} className="mr-2" /> Ajouter Main d'Œuvre
                  </Button>
                </div>

                {newTache.mainOeuvres.length > 0 ? (
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50 text-sm text-gray-700">
                        <tr>
                          <th className="px-4 py-3 text-left font-medium w-6/12">Fonction</th>
                          <th className="px-4 py-3 text-left font-medium w-4/12">Nombre</th>
                          <th className="px-4 py-3 text-center font-medium w-2/12">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {newTache.mainOeuvres.map((mo, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <div>
                                <select
                                  value={mo.fonctionMO}
                                  onChange={(e) => updateMainOeuvre(index, 'fonctionMO', e.target.value)}
                                  className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2"
                                >
                                  <option value="">Sélectionnez une fonction</option>
                                  {['Maçon', 'Électricien', 'Plombier', 'Menuisier', 'Peintre', 'Charpentier', 'Ouvrier', 'Chef de chantier'].map((fonction) => (
                                    <option key={fonction} value={fonction}>{fonction}</option>
                                  ))}
                                </select>
                                {!['Maçon', 'Électricien', 'Plombier', 'Menuisier', 'Peintre', 'Charpentier', 'Ouvrier', 'Chef de chantier', ''].includes(mo.fonctionMO) && (
                                  <Input
                                    value={mo.fonctionMO}
                                    onChange={(e) => updateMainOeuvre(index, 'fonctionMO', e.target.value)}
                                    placeholder="Autre fonction"
                                    className="border-gray-300"
                                  />
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <Input
                                type="number"
                                value={mo.nbrMO}
                                onChange={(e) => updateMainOeuvre(index, 'nbrMO', Number(e.target.value))}
                                min="1"
                                className="border-gray-300"
                              />
                            </td>
                            <td className="px-4 py-3 text-center">
                              <Button
                                type="button" 
                                onClick={() => removeMainOeuvre(index)}
                                variant="ghost" 
                                size="sm"
                                className="text-red-600 hover:text-red-800 hover:bg-red-50"
                              >
                                <Trash2 size={16} />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-10 border rounded-lg bg-gray-50 text-gray-500">
                    Aucune main d'œuvre ajoutée
                  </div>
                )}
              </div>
              
              <div className="bg-gray-50 p-4 flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="border-gray-300"
                  onClick={() => goToSection(2)}
                >
                  Précédent
                </Button>
                <Button 
                  type="button" 
                  className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700"
                  onClick={() => validateSection(3)}
                >
                  Suivant
                </Button>
              </div>
            </div>
          )}

          {/* Section 4: Engins */}
          {currentSection === 4 && (
            <div className="animate-in fade-in duration-300">
              <div className="p-6 border-b">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                    <Truck size={20} />
                  </div>
                  <h6 className="text-lg font-semibold text-gray-800">Engins</h6>
                </div>
                
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 text-teal-800 text-sm text-center mb-5">
                  <Info size={16} className="inline mr-2" /> Ajoutez les engins nécessaires pour cette tâche
                </div>

                <div className="mb-5">
                  <Button 
                    type="button" 
                    onClick={addEngin} 
                    variant="outline"
                    className="border-teal-600 text-teal-700 hover:bg-teal-50"
                  >
                    <PlusCircle size={18} className="mr-2" /> Ajouter Engin
                  </Button>
                </div>

                {newTache.engins.length > 0 ? (
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50 text-sm text-gray-700">
                        <tr>
                          <th className="px-4 py-3 text-left font-medium w-6/12">Type d'Engin</th>
                          <th className="px-4 py-3 text-left font-medium w-4/12">Quantité</th>
                          <th className="px-4 py-3 text-center font-medium w-2/12">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {newTache.engins.map((engin, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <div>
                                <select
                                  value={engin.typeEngin}
                                  onChange={(e) => updateEngin(index, 'typeEngin', e.target.value)}
                                  className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2"
                                >
                                  <option value="">Sélectionnez un type</option>
                                  {['Bulldozer', 'Pelleteuse', 'Camion-benne', 'Grue', 'Niveleuse', 'Compacteur', 'Chargeuse'].map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                  ))}
                                </select>
                                {!['Bulldozer', 'Pelleteuse', 'Camion-benne', 'Grue', 'Niveleuse', 'Compacteur', 'Chargeuse', ''].includes(engin.typeEngin) && (
                                  <Input
                                    value={engin.typeEngin}
                                    onChange={(e) => updateEngin(index, 'typeEngin', e.target.value)}
                                    placeholder="Autre type d'engin"
                                    className="border-gray-300"
                                  />
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <Input
                                type="number"
                                value={engin.nbrEngin}
                                onChange={(e) => updateEngin(index, 'nbrEngin', Number(e.target.value))}
                                min="1"
                                className="border-gray-300"
                              />
                            </td>
                            <td className="px-4 py-3 text-center">
                              <Button
                                type="button" 
                                onClick={() => removeEngin(index)}
                                variant="ghost" 
                                size="sm"
                                className="text-red-600 hover:text-red-800 hover:bg-red-50"
                              >
                                <Trash2 size={16} />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-10 border rounded-lg bg-gray-50 text-gray-500">
                    Aucun engin ajouté
                  </div>
                )}

                {newTache.engins.length > 0 && (
                  <div className="mt-4 bg-teal-50 border border-teal-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <h6 className="text-teal-800 font-medium flex items-center">
                        <Truck size={16} className="mr-2" />
                        Total Engins
                      </h6>
                      <Badge className="bg-teal-600 hover:bg-teal-700">
                        {calculateEnginsTotal()} engins
                      </Badge>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="bg-gray-50 p-4 flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="border-gray-300"
                  onClick={() => goToSection(3)}
                >
                  Précédent
                </Button>
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700"
                  disabled={!isFormValid()}
                >
                  Enregistrer
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </Card>
  );
};

export default TaskModal;
