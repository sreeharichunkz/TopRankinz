<?php

namespace Database\Factories;

use App\Models\Profile;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Profile>
 */
class ProfileFactory extends Factory
{
    protected $model = Profile::class;

    public function definition(): array    
    {

        // Load Indian states and districts data
        $indianStatesAndDistricts = require database_path('data/indian_states_and_districts.php');

        // Pick a random state
        $state = $this->faker->randomElement(array_keys($indianStatesAndDistricts));

        // Pick a random district from the selected state
        $district = $this->faker->randomElement($indianStatesAndDistricts[$state]);

       return [
            'name' => $this->faker->name,
            'industry' => $this->faker->randomElement(['Technology', 'Finance', 'Healthcare', 'Education', 'Actor','Athlete', 'Politician']),
            'about' => $this->faker->paragraphs(3, true),
            'image' => $this->faker->randomElement(['profile_images/DPXUqzh6SkciYuSzk8OfUp4tkgMo9JShgu6ju2wB.png','profile_images/6u5dol8c9jD3ZYuJTdrmLzyW9X6SHc8m6l4DNhVe.png','profile_images/sPfq8D76rQy0DyznSwvgkfRQQHoBkUv5qXtoilDQ.png','profile_images/9Z7wHUBPQL56I90oUFD6SCDJwTo7m3jtpn7VxKlj.png','profile_images/k00aNq9pOON0CWBsTMgBSXmFUggPQCDcZ6CHfQ6F.png','profile_images/No8dOzGfEs6lhFvHB7dD1CztMDxbiED8OqZbmhLV.png','profile_images/GJ50IYafJtcAmpRUAMXOxmSMR1hthpAZXYj8ZG5z.png']),
            'age' => $this->faker->numberBetween(18, 80),
            'height' => $this->faker->randomFloat(2, 1.5, 2.1) . ' m',
            'net_worth' => '₹' . $this->faker->numberBetween(10, 1000).'cr',
            'marital_status' => $this->faker->randomElement(['Single', 'Married', 'Unmarried']),
            'children' => $this->faker->numberBetween(0, 5),
            'education' => $this->faker->randomElement(['High School', 'Bachelor\'s Degree', 'Master\'s Degree', 'PhD']),
           'citizenship' => 'Indian',
            'residence' => $state,
            'state' => $state,
            'district' => $district,
            'career_status' => $this->faker->randomElement(['Active', 'Retired']),
        ];
    }
}
