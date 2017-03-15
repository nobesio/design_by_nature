function Population(mutation_rate, population_size) {
    
    this.mutation_rate = mutation_rate;
    this.population = [];
    this.mating_pool = [];
    this.generation = 0;

    for (var i=0; i<population_size; i++) {
        this.population[i] = new House(new DNA(), i);
    }

    print(this.population);

    this.display = function() {
        for (var i=0; i<this.population.length; i++) {
            this.population[i].display();
        }
    }

    this.rollover = function(mx, my) {
        for (var i=0; i<this.population.length; i++) {
            this.population[i].rollover(mx, my);
        }
    }

    this.get_generation = function() {
       return this.generation;
    }

    this.get_max_fitness = function() {
        var record = 0;
        for (var i = 0; i < this.population.length; i++) {
            if (this.population[i].get_fitness() > record) {
                record = this.population[i].get_fitness();
            }
        }
        return record;
    }

    this.selection = function() {
        this.mating_pool = [];

        var max_fitness = this.get_max_fitness();

        for (var i=0; i<this.population.length; i++) {

            var fitness_normalized = map(this.population[i].get_fitness(), 0, max_fitness, 0, 1);
            var n = floor(fitness_normalized * 100);

            for (var j = 0; j < n; j++) {
                this.mating_pool.push(this.population[i]);
            }

        }
    }

    this.reproduction = function() {

        for (var i=0; i<this.population.length; i++) {
            var mom_position = floor(random(this.mating_pool.length));
            var dad_position = floor(random(this.mating_pool.length));

            var mom = this.mating_pool[mom_position];
            var dad = this.mating_pool[dad_position];

            var mom_genes = mom.get_dna();
            var dad_genes = dad.get_dna();

            var child_genes = mom_genes.crossover(dad_genes);
            child_genes.mutate(this.mutation_rate);

            this.population[i] = new House(child_genes, i);
        }

        this.generation++;
    }

}