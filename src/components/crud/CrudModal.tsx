import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";
import { CrudConfig } from "./types";

interface CrudModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    config: CrudConfig;
    editingItem: any | null;
    formData: { [key: string]: string };
    setFormData: (data: { [key: string]: string }) => void;
    onSubmit: () => void;
}

export default function CrudModal({ isOpen, onOpenChange, config, editingItem, formData, setFormData, onSubmit }: CrudModalProps) {
    const isFormValid = config.fields.every(
        (field) => !field.required || (formData[field.name] && formData[field.name].trim() !== "")
    );

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="bg-slate-900/95 border border-white/10 rounded-2xl max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-white text-2xl font-bold flex items-center">
                        <MapPin className="w-6 h-6 text-[#C4F000] mr-3" />
                        {editingItem ? `Editar ${config.entityName}` : `Nova ${config.entityName}`}
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-6 py-4">
                    {config.fields.map((field) => (
                        <div key={field.name} className="space-y-2">
                            <Label htmlFor={field.name} className="text-white font-medium">
                                {field.label} {field.required ? "*" : ""}
                            </Label>
                            {field.type === "textarea" ? (
                                <Textarea
                                    id={field.name}
                                    placeholder={field.label}
                                    value={formData[field.name] || ""}
                                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                    className="bg-white/5 border border-white/10 text-white rounded-xl focus:border-[#C4F000]"
                                />
                            ) : field.type === "select" ? (
                                <Select
                                    value={formData[field.name] || ""}
                                    onValueChange={(value) => setFormData({ ...formData, [field.name]: value })}
                                >
                                    <SelectTrigger className="bg-white/5 border border-white/10 text-white rounded-xl">
                                        <SelectValue placeholder={`Selecione ${field.label.toLowerCase()}`} />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-800 border-white/10">
                                        {field.options?.map((option) => (
                                            <SelectItem key={option.value} value={option.value} className="text-white hover:bg-white/10">
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ) : (
                                <Input
                                    id={field.name}
                                    type={field.type}
                                    placeholder={field.label}
                                    value={formData[field.name] || ""}
                                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                    className="bg-white/5 border border-white/10 text-white rounded-xl focus:border-[#C4F000]"
                                />
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-6 border-t border-white/10">
                    <Button
                        variant="outline"
                        className="flex-1 border-2 border-white/20 text-white bg-transparent hover:bg-white/10 rounded-xl"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancelar
                    </Button>
                    <Button
                        className="flex-1 bg-gradient-to-r from-[#C4F000] to-cyan-400 text-black font-bold rounded-xl"
                        onClick={onSubmit}
                        disabled={!isFormValid}
                    >
                        {editingItem ? "Salvar Alterações" : `Criar ${config.entityName}`}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}