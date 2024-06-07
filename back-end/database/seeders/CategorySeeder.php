<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::create([
            'name' => 'Frutta e Verdura',
        ]);

        Category::create([
            'name' => 'Pasta Riso e Cereali',
        ]);

        Category::create([
            'name' => 'Alcolici',
        ]);

        Category::create([
            'name' => 'Carne',
        ]);

        Category::create([
            'name' => 'Detersivi',
        ]);

        Category::create([
            'name' => 'Latticini',
        ]);

        Category::create([
            'name' => 'Salumi e Affettati',
        ]);

        Category::create([
            'name' => 'Pane e Pasticceria',
        ]);

        Category::create([
            'name' => 'Sughi e Scatolame',
        ]);

        Category::create([
            'name' => 'Cartoleria',
        ]);

        Category::create([
            'name' => 'Uova, Farina e Preparati',
        ]);

        Category::create([
            'name' => 'Acqua e Bibite',
        ]);

        Category::create([
            'name' => 'Igiene e cura personale',
        ]);

        Category::create([
            'name' => 'Pulizia della casa',
        ]);

        Category::create([
            'name' => 'Bimbi e infanzia',
        ]);

        Category::create([
            'name' => 'Animali',
        ]);
    }
}
