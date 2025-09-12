import React, { useState } from 'react';
import { Search as SearchIcon, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { AppHeader } from '@/components/common/AppHeader';
import { Badge } from '@/components/ui/badge';

// Mock breed data
const breeds = [
  {
    id: 1,
    name: 'Holstein Friesian',
    type: 'Cattle',
    origin: 'Netherlands',
    characteristics: ['High milk production', 'Black and white markings'],
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=300&h=200&fit=crop'
  },
  {
    id: 2,
    name: 'Jersey',
    type: 'Cattle',
    origin: 'Jersey Island',
    characteristics: ['Rich milk', 'Small to medium size', 'Brown color'],
    image: 'https://images.unsplash.com/photo-1551652994-2049b75840bb?w=300&h=200&fit=crop'
  },
  {
    id: 3,
    name: 'Murrah Buffalo',
    type: 'Buffalo',
    origin: 'India',
    characteristics: ['High milk yield', 'Black color', 'Curved horns'],
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=200&fit=crop'
  },
  {
    id: 4,
    name: 'Angus',
    type: 'Cattle',
    origin: 'Scotland',
    characteristics: ['Beef cattle', 'Black or red color', 'Hornless'],
    image: 'https://images.unsplash.com/photo-1563166436-08dc18b4e7d1?w=300&h=200&fit=crop'
  },
  {
    id: 5,
    name: 'Nili-Ravi Buffalo',
    type: 'Buffalo',
    origin: 'Pakistan',
    characteristics: ['High milk production', 'Large size', 'Dark color'],
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=200&fit=crop'
  },
  {
    id: 6,
    name: 'Gir Cow',
    type: 'Cattle',
    origin: 'India',
    characteristics: ['Indigenous breed', 'White with red/brown patches', 'Drooping ears'],
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=300&h=200&fit=crop'
  }
];

const Search = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Cattle' | 'Buffalo'>('All');

  const filteredBreeds = breeds.filter(breed => {
    const matchesSearch = breed.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         breed.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         breed.characteristics.some(char => 
                           char.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    
    const matchesFilter = filterType === 'All' || breed.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-4 animate-fade-in">
      <AppHeader title="Browse Breeds" showBack={true} showHelp={true} />

      {/* Search and Filter */}
      <div className="space-y-3">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search breeds, origin, or characteristics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 text-base"
          />
        </div>

        <div className="flex gap-2">
          {(['All', 'Cattle', 'Buffalo'] as const).map((type) => (
            <Button
              key={type}
              variant={filterType === type ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType(type)}
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          {filteredBreeds.length} breed{filteredBreeds.length !== 1 ? 's' : ''} found
        </p>
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchTerm('')}
          >
            Clear search
          </Button>
        )}
      </div>

      {/* Breed List */}
      <div className="space-y-3">
        {filteredBreeds.map((breed) => (
          <Card 
            key={breed.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(`/breed-info/${breed.name.toLowerCase().replace(/\s+/g, '-')}`)}
          >
            <CardContent className="p-4">
              <div className="flex gap-4">
                <img
                  src={breed.image}
                  alt={breed.name}
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-foreground truncate">{breed.name}</h3>
                    <Badge variant="secondary" className="ml-2">
                      {breed.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Origin: {breed.origin}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {breed.characteristics.slice(0, 2).map((char, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {char}
                      </Badge>
                    ))}
                    {breed.characteristics.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{breed.characteristics.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBreeds.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <SearchIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">No breeds found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search terms or filters
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Search;