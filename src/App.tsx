import { useState } from 'react'
import { Plus } from 'lucide-react'
import { BlogList } from './components/BlogList'
import { BlogDetail } from './components/BlogDetail'
import { CreateBlogForm } from './components/CreateBlogForm'
import { Button } from './components/ui/button'
import { Dialog, DialogTrigger } from './components/ui/dialog'
import { cn } from './lib/utils'
import './App.css'

function App() {
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen max-h-screen bg-background overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b bg-card shrink-0 z-30 relative">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">M</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight">CA Monk Blog</h1>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Create Blog</span>
            </Button>
          </DialogTrigger>
          <CreateBlogForm onSuccess={() => setIsDialogOpen(false)} />
        </Dialog>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 overflow-hidden relative">
        {/* Left Panel: Blog List */}
        <aside className={cn(
          "w-full md:w-80 lg:w-96 border-r flex flex-col shrink-0 bg-muted/30 transition-all duration-300 md:translate-x-0 absolute inset-0 z-20 md:relative",
          selectedBlogId ? "-translate-x-full md:translate-x-0" : "translate-x-0"
        )}>
          <div className="p-4 border-b bg-card">
            <h2 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Latest Articles</h2>
          </div>
          <BlogList
            selectedBlogId={selectedBlogId}
            onBlogSelect={setSelectedBlogId}
          />
        </aside>

        {/* Right Panel: Blog Detail */}
        <section className={cn(
          "flex-1 overflow-hidden bg-card transition-all duration-300 h-full absolute inset-0 z-10 md:relative md:translate-x-0",
          selectedBlogId ? "translate-x-0" : "translate-x-full md:translate-x-0"
        )}>
          {selectedBlogId && (
            <div className="md:hidden p-4 border-b flex items-center bg-card sticky top-0 z-10">
              <Button variant="ghost" size="sm" onClick={() => setSelectedBlogId(null)} className="gap-2 focus:ring-0">
                <span className="text-xl">&larr;</span> Back to list
              </Button>
            </div>
          )}
          <BlogDetail blogId={selectedBlogId} />
        </section>
      </main>
    </div>
  )
}

export default App
