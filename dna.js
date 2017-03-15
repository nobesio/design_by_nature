function DNA(new_genes) {

    var dna_length = 50;

    if (new_genes) {
        this.genes = new_genes;
    } else {
        this.genes = Array(dna_length);
        for (var i=0; i < this.genes.length; i++) {
            this.genes[i] = random(0,1);
        }
    }

    this.crossover = function(partner_dna) {
        var child = Array(this.genes.length);
        for (var i = 0; i < this.genes.length; i++) {
            if (random() < 0.5) {
                child[i] = this.genes[i];
            } else {
                child[i] = partner_dna.genes[i];
            }                
        }
        var newgenes = new DNA(child);
        return newgenes;
    }

    this.mutate = function(mutation_rate) {
        for (var i=0; i < this.genes.length; i ++) {
            if (random() < mutation_rate) {
                this.genes[i] = random(0,1);
            }
        }
    }
    
}