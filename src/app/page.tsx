"use client"

import { useState } from "react"
import { Search, Plus, Phone, Edit, Trash, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ContactForm from "@/components/contact-form"

// Tipo para los contactos
type Contact = {
  id: string
  name: string
  phone: string
  email: string
}

export default function ContactsApp() {
  // Estado para los contactos
  const [contacts, setContacts] = useState<Contact[]>([
    { id: "1", name: "Juan Pérez", phone: "+34 612 345 678", email: "juan@ejemplo.com" },
    { id: "2", name: "María García", phone: "+34 623 456 789", email: "maria@ejemplo.com" },
    { id: "3", name: "Carlos López", phone: "+34 634 567 890", email: "carlos@ejemplo.com" },
  ])

  // Estado para la búsqueda
  const [searchTerm, setSearchTerm] = useState("")

  // Estado para mostrar/ocultar el formulario
  const [showForm, setShowForm] = useState(false)

  // Estado para el contacto que se está editando
  const [editingContact, setEditingContact] = useState<Contact | null>(null)

  // Filtrar contactos según el término de búsqueda
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Función para agregar un contacto
  const addContact = (contact: Omit<Contact, "id">) => {
    const newContact = {
      ...contact,
      id: Date.now().toString(),
    }
    setContacts([...contacts, newContact])
    setShowForm(false)
  }

  // Función para actualizar un contacto
  const updateContact = (updatedContact: Contact) => {
    setContacts(contacts.map((contact) => (contact.id === updatedContact.id ? updatedContact : contact)))
    setEditingContact(null)
    setShowForm(false)
  }

  // Función para eliminar un contacto
  const deleteContact = (id: string) => {
    setContacts(contacts.filter((contact) => contact.id !== id))
  }

  // Función para iniciar la edición de un contacto
  const startEditing = (contact: Contact) => {
    setEditingContact(contact)
    setShowForm(true)
  }

  // Función para simular una llamada
  const callContact = (phone: string) => {
    alert(`Llamando a ${phone}...`)
  }

  return (
    <div className="min-h-screen bg-[#0c0c0c] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Efectos de fondo con glassmorphism */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-emerald-500/10 to-yellow-500/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md rounded-3xl overflow-hidden backdrop-blur-2xl bg-black/30 shadow-2xl border border-white/10 relative z-10">
        <div className="p-6 space-y-6">
          {/* Cabecera */}
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-white">Mis Contactos</h1>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400"
              onClick={() => {
                setEditingContact(null)
                setShowForm(true)
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Barra de búsqueda */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <Input
              type="text"
              placeholder="Buscar contactos..."
              className="pl-10 bg-white/5 border-white/10 text-white rounded-xl focus:ring-emerald-500/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Lista de contactos */}
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 -mr-2">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-white">{contact.name}</h3>
                      <p className="text-sm text-zinc-400">{contact.phone}</p>
                      <p className="text-xs text-zinc-500">{contact.email}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400"
                        onClick={() => callContact(contact.phone)}
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400"
                        onClick={() => startEditing(contact)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-400"
                        onClick={() => deleteContact(contact.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-zinc-500">No se encontraron contactos</p>
              </div>
            )}
          </div>

          {/* Pie de página */}
          <div className="pt-4 border-t border-white/10 text-center">
            <span className="text-xs text-zinc-500">Contactos App</span>
          </div>
        </div>
      </div>

      {/* Modal para agregar/editar contactos */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-full max-w-md rounded-3xl overflow-hidden backdrop-blur-2xl bg-black/50 shadow-2xl border border-white/10 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">{editingContact ? "Editar Contacto" : "Nuevo Contacto"}</h2>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-white/10 text-zinc-400 hover:text-white"
                onClick={() => {
                  setShowForm(false)
                  setEditingContact(null)
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <ContactForm
              initialData={editingContact}
              onSubmit={editingContact ? updateContact : addContact}
              onCancel={() => {
                setShowForm(false)
                setEditingContact(null)
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

