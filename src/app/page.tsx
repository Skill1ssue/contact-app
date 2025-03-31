"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon, PlusIcon, SearchIcon } from "lucide-react"
// import { useTheme } from "next-themes"
// import ContactList from "@/components/contact-list"
// import AddContactDialog from "@/components/add-contact-dialog"
// import type { Contact } from "@/lib/types"
// import { initialContacts } from "@/lib/data"

export default function ContactsPage() {
  // const { theme, setTheme } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")
  // const [contacts, setContacts] = useState<Contact[]>(initialContacts)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Evitar hidratación incorrecta
  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // const filteredContacts = contacts
  //   .filter((contact) => contact.name.toLowerCase().includes(searchQuery.toLowerCase()))
  //   .sort((a, b) => a.name.localeCompare(b.name))

  // const handleAddContact = (newContact: Contact) => {
  //   setContacts([...contacts, newContact])
  //   setIsAddDialogOpen(false)
  // }

  // const handleEditContact = (updatedContact: Contact) => {
  //   setContacts(contacts.map((contact) => (contact.id === updatedContact.id ? updatedContact : contact)))
  // }

  // const handleDeleteContact = (id: string) => {
  //   setContacts(contacts.filter((contact) => contact.id !== id))
  // }

  // const toggleTheme = () => {
  //   setTheme(theme === "dark" ? "light" : "dark")
  // }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background">
      {/* Header sticky */}
      <div
        className={`sticky top-0 z-10 bg-background/80 backdrop-blur-sm transition-shadow ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div className="max-w-4xl mx-auto p-4 md:p-6">
          <header className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Mis Contactos</h1>
            <Button variant="outline" size="icon"  aria-label="Cambiar tema">
              {/* {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />} */}
            </Button>
          </header>

          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar contactos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Añadir Contacto
            </Button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      {/* <div className="max-w-4xl mx-auto p-4 md:px-6 pt-0">
        <ContactList contacts={filteredContacts} onEdit={handleEditContact} onDelete={handleDeleteContact} />
        <AddContactDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onAdd={handleAddContact} />
      </div> */}
    </div>
  )
}


