import os
import csv

def split_csv(input_file, output_directory, chunk_size):
    # Crea la directory di output se non esiste
    if not os.path.exists(output_directory):
        os.makedirs(output_directory)

    # Apri il file CSV di input
    with open(input_file, 'r') as file:
        reader = csv.reader(file)
        header = next(reader)

        current_chunk_size = 0
        current_chunk_number = 1
        current_chunk_data = [header]

        # Leggi le righe del file CSV e scrivi i chunk separati
        for row in reader:
            row_size = len(','.join(row))  # Calcola la dimensione della riga in byte
            if current_chunk_size + row_size > chunk_size:
                output_file = os.path.join(output_directory, f'chunk_{current_chunk_number}.csv')
                with open(output_file, 'w', newline='') as chunk_file:
                    writer = csv.writer(chunk_file)
                    writer.writerows(current_chunk_data)

                print(f"Creato file {output_file}")

                # Prepara un nuovo chunk
                current_chunk_number += 1
                current_chunk_size = 0
                current_chunk_data = [header]

            current_chunk_size += row_size
            current_chunk_data.append(row)

        # Scrivi l'ultimo chunk se necessario
        if len(current_chunk_data) > 1:
            output_file = os.path.join(output_directory, f'chunk_{current_chunk_number}.csv')
            with open(output_file, 'w', newline='') as chunk_file:
                writer = csv.writer(chunk_file)
                writer.writerows(current_chunk_data)

            print(f"Creato file {output_file}")

# Utilizzo
input_file = r"C:\Users\Michelangelo\Desktop\Mapping csv\unito.csv"
output_directory = 'output'
chunk_size = 90* 1024 * 1024  # 100 megabyte

split_csv(input_file, output_directory, chunk_size)
